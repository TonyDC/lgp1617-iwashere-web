'use strict';

// language=POSTGRES-PSQL
module.exports = {
    down: (queryInterface) => {
        return queryInterface.sequelize.query(`
            DROP TRIGGER insert_route_text_trigger ON routes;
            DROP TRIGGER update_route_text_trigger ON routes;
            DROP FUNCTION route_description_trigger_body();
            
            DROP TRIGGER timestamp_routes_trigger ON routes;
            DROP INDEX route_text_index;
            DROP TABLE routes;
        `);
    },

    up: (queryInterface) => {
        return queryInterface.sequelize.query(`
            CREATE TABLE routes (
                route_id BIGSERIAL PRIMARY KEY,
                content_editor_id TEXT NOT NULL REFERENCES content_editors(uid),
                name TEXT NOT NULL,
                description TEXT NOT NULL,
                text TEXT NOT NULL,
                created_at TIMESTAMP NOT NULL,
                updated_at TIMESTAMP
            );
            
            CREATE INDEX route_text_index ON routes USING GIN (to_tsvector('portuguese', text));
            
            CREATE TRIGGER timestamp_routes_trigger
                BEFORE INSERT OR UPDATE ON routes
                FOR EACH ROW
                EXECUTE PROCEDURE register_dates_trigger_body();
                
            CREATE FUNCTION route_description_trigger_body() RETURNS trigger AS
                $body$
                BEGIN
                    NEW.text := NEW.name || ' ' || NEW.description;
                    RETURN NEW;
                END;
                $body$ LANGUAGE plpgsql;
                
            CREATE TRIGGER update_route_text_trigger
                BEFORE UPDATE ON routes
                FOR EACH ROW
                WHEN (OLD.name != NEW.name OR OLD.description != NEW.description)
                EXECUTE PROCEDURE route_description_trigger_body();
                
            CREATE TRIGGER insert_route_text_trigger
                BEFORE INSERT ON routes
                FOR EACH ROW
                EXECUTE PROCEDURE route_description_trigger_body();
        `);
    }
};

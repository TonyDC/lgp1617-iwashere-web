'use strict';

// language=POSTGRES-PSQL
module.exports = {
    down: (queryInterface) => {

        return queryInterface.sequelize.query(`
            DROP TRIGGER timestamp_pois_trigger ON pois;
            DROP TRIGGER insert_poi_text_trigger ON pois;
            DROP TRIGGER update_poi_text_trigger ON pois;
            DROP FUNCTION poi_description_trigger_body();
            
            DROP INDEX poi_text_index;
            DROP INDEX poi_latitude_longitude_index;
            
            DROP TABLE pois;
        `);
    },

    up: (queryInterface) => {
        return queryInterface.sequelize.query(`
            CREATE TABLE pois (
                poi_id BIGSERIAL PRIMARY KEY,
                name TEXT NOT NULL,
                description TEXT NOT NULL,
                address TEXT NOT NULL,
                text TEXT NOT NULL,
                latitude DOUBLE PRECISION NOT NULL,
                longitude DOUBLE PRECISION NOT NULL,
                poi_type_id BIGINT NOT NULL REFERENCES poi_types(poi_type_id) ON DELETE RESTRICT,
                parent_id BIGINT REFERENCES pois (poi_id) CHECK (parent_id IS NULL OR parent_id != poi_id),
                content_editor BIGINT REFERENCES content_editors(content_editor_id) NOT NULL,
                created_at TIMESTAMP NOT NULL,
                updated_at TIMESTAMP
            );
        
            CREATE INDEX poi_latitude_longitude_index ON pois USING BTREE (latitude, longitude);
            CREATE INDEX poi_text_index ON pois USING GIN (to_tsvector('portuguese', text));
            
            CREATE FUNCTION poi_description_trigger_body() RETURNS trigger AS
                $body$
                BEGIN
                    NEW.text := NEW.name || ' ' || NEW.description || ' ' || NEW.address;
                    RETURN NEW;
                END;
                $body$ LANGUAGE plpgsql;
                        
            CREATE TRIGGER update_poi_text_trigger
                BEFORE UPDATE ON pois
                FOR EACH ROW
                WHEN (OLD.name != NEW.name OR OLD.description != NEW.description OR OLD.address != NEW.address)
                EXECUTE PROCEDURE poi_description_trigger_body();
                
            CREATE TRIGGER insert_poi_text_trigger
                BEFORE INSERT ON pois
                FOR EACH ROW
                EXECUTE PROCEDURE poi_description_trigger_body();
                
            CREATE TRIGGER timestamp_pois_trigger
                BEFORE INSERT OR UPDATE ON pois
                FOR EACH ROW
                EXECUTE PROCEDURE register_dates_trigger_body();
        `);
    }
};

'use strict';

// language=POSTGRES-PSQL
module.exports = {
    down: (queryInterface) => {
        return queryInterface.sequelize.query(`
            DROP TRIGGER timestamp_poi_contents_trigger ON poi_contents;
            DROP TABLE poi_contents;
        `);
    },

    up: (queryInterface) => {
        return queryInterface.sequelize.query(`
            CREATE TABLE poi_contents (
                id BIGSERIAL PRIMARY KEY,
                url TEXT NOT NULL,
                description TEXT NOT NULL,
                type_id INTEGER NOT NULL REFERENCES content_types(id) ON DELETE RESTRICT,
                poi_id BIGINT NOT NULL REFERENCES pois(id) ON DELETE RESTRICT,
                created_at TIMESTAMP NOT NULL,
                updated_at TIMESTAMP
            );
            
            CREATE TRIGGER timestamp_poi_contents_trigger
                BEFORE INSERT OR UPDATE ON poi_contents
                FOR EACH ROW
                EXECUTE PROCEDURE register_dates_trigger_body();
        `);
    }
};

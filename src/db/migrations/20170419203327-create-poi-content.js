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
                poi_content_id BIGSERIAL PRIMARY KEY,
                url_xs TEXT NOT NULL,
                url_s TEXT NOT NULL,
                url_m TEXT NOT NULL,
                url_l TEXT NOT NULL,
                content_type_id INTEGER NOT NULL REFERENCES content_types(content_type_id) ON DELETE RESTRICT,
                poi_id BIGINT NOT NULL REFERENCES pois(poi_id) ON DELETE RESTRICT,
                deleted BOOL NOT NULL DEFAULT FALSE,
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

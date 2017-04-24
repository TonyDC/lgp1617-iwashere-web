'use strict';

// language=POSTGRES-PSQL
module.exports = {
    down: (queryInterface) => {
        return queryInterface.sequelize.query(`DROP TRIGGER timestamp_poi_tags_trigger ON poi_tags`).
        then(() => {
            queryInterface.dropTable('poi_tags');
        });
    },
    up: (queryInterface) => {
        return queryInterface.sequelize.query(`
            CREATE TABLE poi_tags (
                poi_id BIGINT NOT NULL REFERENCES pois(poi_id) ON DELETE RESTRICT,
                tag_id BIGINT NOT NULL REFERENCES tags(tag_id) ON DELETE RESTRICT,
                created_at TIMESTAMP NOT NULL,
                updated_at TIMESTAMP,
                
                CONSTRAINT poi_tags_pk PRIMARY KEY (poi_id, tag_id)
            );
        
            CREATE TRIGGER timestamp_poi_tags_trigger
                BEFORE INSERT OR UPDATE ON poi_tags
                FOR EACH ROW
                EXECUTE PROCEDURE register_dates_trigger_body();
        `);
    }
};

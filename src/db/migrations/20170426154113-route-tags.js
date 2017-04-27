'use strict';

// language=POSTGRES-PSQL
module.exports = {
    down: (queryInterface) => {
        return queryInterface.sequelize.query(`
            DROP TRIGGER timestamp_route_tags_trigger ON route_tags;
            DROP TABLE route_tags;
        `);
    },

    up: (queryInterface) => {
        return queryInterface.sequelize.query(`
            CREATE TABLE route_tags (
                route_id BIGINT NOT NULL REFERENCES routes(route_id) ON DELETE RESTRICT,
                tag_id BIGINT NOT NULL REFERENCES tags(tag_id) ON DELETE RESTRICT,
                created_at TIMESTAMP NOT NULL,
                updated_at TIMESTAMP,
                
                CONSTRAINT pk_route_tag PRIMARY KEY (route_id, tag_id)
            );
            
            CREATE TRIGGER timestamp_route_tags_trigger
                BEFORE INSERT OR UPDATE ON route_tags
                FOR EACH ROW
                EXECUTE PROCEDURE register_dates_trigger_body();
        `);
    }
};

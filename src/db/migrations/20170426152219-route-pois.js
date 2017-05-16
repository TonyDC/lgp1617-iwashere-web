'use strict';

// language=POSTGRES-PSQL
module.exports = {
    down: (queryInterface) => {
        return queryInterface.sequelize.query(`
            DROP TRIGGER timestamp_route_pois_trigger ON route_pois;
            DROP TABLE route_pois;
        `);
    },

    up: (queryInterface) => {
        return queryInterface.sequelize.query(`
            CREATE TABLE route_pois (
                route_id BIGINT NOT NULL REFERENCES routes(route_id),
                poi_id BIGINT NOT NULL REFERENCES pois(poi_id),
                poi_order SMALLINT NOT NULL DEFAULT 0,                  -- TODO order restrictions
                created_at TIMESTAMP NOT NULL,
                updated_at TIMESTAMP,
                
                CONSTRAINT pk_route_pois PRIMARY KEY (route_id, poi_id)
            );
            
            CREATE TRIGGER timestamp_route_pois_trigger
                BEFORE INSERT OR UPDATE ON route_pois
                FOR EACH ROW
                EXECUTE PROCEDURE register_dates_trigger_body();
        `);
    }
};

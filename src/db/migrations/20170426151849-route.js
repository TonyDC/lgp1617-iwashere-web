'use strict';

// language=POSTGRES-PSQL
module.exports = {
    down: (queryInterface) => {
        return queryInterface.sequelize.query(`
            DROP TRIGGER timestamp_routes_trigger ON routes;
            DROP TABLE routes;
        `);
    },

    up: (queryInterface) => {
        return queryInterface.sequelize.query(`
            CREATE TABLE routes (
                route_id BIGINT PRIMARY KEY,
                description TEXT NOT NULL,
                created_at TIMESTAMP NOT NULL,
                updated_at TIMESTAMP
            );
            
            CREATE TRIGGER timestamp_routes_trigger
                BEFORE INSERT OR UPDATE ON routes
                FOR EACH ROW
                EXECUTE PROCEDURE register_dates_trigger_body();
        `);
    }
};

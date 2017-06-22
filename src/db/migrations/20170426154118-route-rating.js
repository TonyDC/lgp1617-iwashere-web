'use strict';

// language=POSTGRES-PSQL
module.exports = {
    down: (queryInterface) => {
        return queryInterface.sequelize.query(`
            DROP TRIGGER timestamp_route_ratings_trigger ON route_ratings;
            DROP TABLE route_ratings;
        `);
    },

    up: (queryInterface) => {
        return queryInterface.sequelize.query(`
            CREATE TABLE route_ratings (
                route_id BIGINT NOT NULL REFERENCES routes(route_id) ON DELETE RESTRICT,
                user_id TEXT NOT NULL REFERENCES users(uid) ON DELETE RESTRICT,
                rating INTEGER NOT NULL,
                created_at TIMESTAMP NOT NULL,
                updated_at TIMESTAMP,
                
                CONSTRAINT route_rating_constraint CHECK (rating IN (0, 1, 2, 3, 4, 5)),
                CONSTRAINT pk_route_user PRIMARY KEY (route_id, user_id, created_at)
            );
            
            CREATE TRIGGER timestamp_route_ratings_trigger
                BEFORE INSERT OR UPDATE ON route_ratings
                FOR EACH ROW
                EXECUTE PROCEDURE register_dates_trigger_body();
        `);
    }
};

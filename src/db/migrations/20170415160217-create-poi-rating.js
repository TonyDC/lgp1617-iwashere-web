'use strict';

// language=POSTGRES-PSQL
module.exports = {
    down: (queryInterface) => {
        return queryInterface.sequelize.query(`
            DROP TRIGGER timestamp_poi_ratings_trigger ON poi_ratings;
            DROP TABLE poi_ratings;
        `);
    },

    up: (queryInterface) => {
        return queryInterface.sequelize.query(`
            CREATE TABLE poi_ratings (
                poi_id BIGINT NOT NULL REFERENCES pois(poi_id) ON DELETE RESTRICT,
                user_id TEXT NOT NULL REFERENCES users(uid) ON DELETE RESTRICT,
                rating INTEGER NOT NULL,
                created_at TIMESTAMP NOT NULL,
                updated_at TIMESTAMP,
                
                CONSTRAINT rating_poi_rating_constraint CHECK (rating IN (0, 1, 2, 3, 4, 5)),
                CONSTRAINT poi_ratings_poi_user_pk PRIMARY KEY (poi_id, user_id)
            );
        
            CREATE TRIGGER timestamp_poi_ratings_trigger
                BEFORE INSERT OR UPDATE ON poi_ratings
                FOR EACH ROW
                EXECUTE PROCEDURE register_dates_trigger_body();
        `);
    }
};

'use strict';

// language=POSTGRES-PSQL
module.exports = {
    down: (queryInterface) => {
        return queryInterface.sequelize.query(`
            DROP TRIGGER timestamp_likes_trigger ON likes;
            DROP TABLE likes;
        `);
    },

    up: (queryInterface) => {
        return queryInterface.sequelize.query(`
            CREATE TABLE likes (
                poi_id BIGINT NOT NULL REFERENCES pois(poi_id) ON DELETE RESTRICT,
                user_id TEXT NOT NULL REFERENCES users(uid) ON DELETE RESTRICT,
                created_at TIMESTAMP NOT NULL,
                updated_at TIMESTAMP,
                
                CONSTRAINT likes_poi_user_pk PRIMARY KEY (poi_id, user_id)
            );
            
            CREATE TRIGGER timestamp_likes_trigger
                BEFORE INSERT OR UPDATE ON likes
                FOR EACH ROW
                EXECUTE PROCEDURE register_dates_trigger_body();
        `);
    }
};

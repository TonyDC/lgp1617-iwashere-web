'use strict';

// language=POSTGRES-PSQL
module.exports = {
    down: (queryInterface) => {
        return queryInterface.sequelize.query(`
            DROP TRIGGER timestamp_posts_trigger ON posts;
            DROP TABLE posts;
        `);
    },

    up: (queryInterface) => {
        return queryInterface.sequelize.query(`
            CREATE TABLE posts (
                post_id BIGSERIAL PRIMARY KEY,
                description TEXT NOT NULL,
                poi_id BIGINT NOT NULL REFERENCES pois(poi_id) ON DELETE RESTRICT,
                user_id TEXT NOT NULL REFERENCES users(uid) ON DELETE RESTRICT,
                created_at TIMESTAMP NOT NULL,
                updated_at TIMESTAMP
            );
            
            CREATE TRIGGER timestamp_posts_trigger
                BEFORE INSERT OR UPDATE ON posts
                FOR EACH ROW
                EXECUTE PROCEDURE register_dates_trigger_body();
        `);
    }
};

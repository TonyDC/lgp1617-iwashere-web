'use strict';

// language=POSTGRES-PSQL
module.exports = {
    down: (queryInterface) => {
        return queryInterface.sequelize.query(`
            DROP TRIGGER timestamp_post_contents_trigger ON post_contents;
            DROP TABLE post_contents;
        `);
    },

    up: (queryInterface) => {
        return queryInterface.sequelize.query(`
            CREATE TABLE post_contents (
                content_id BIGSERIAL PRIMARY KEY,
                url_xs TEXT NOT NULL,
                url_s TEXT NOT NULL,
                url_m TEXT NOT NULL,
                url_l TEXT NOT NULL,
                content_type_id INTEGER NOT NULL REFERENCES content_types(content_type_id) ON DELETE RESTRICT,
                post_id BIGINT NOT NULL REFERENCES posts(post_id) ON DELETE RESTRICT,
                created_at TIMESTAMP NOT NULL,
                updated_at TIMESTAMP
            );
            
            CREATE TRIGGER timestamp_post_contents_trigger
                BEFORE INSERT OR UPDATE ON post_contents
                FOR EACH ROW
                EXECUTE PROCEDURE register_dates_trigger_body();
        `);
    }
};

'use strict';

module.exports = {
    down: (queryInterface) => {
        return queryInterface.sequelize.query(`DROP TRIGGER timestamp_post_tags_trigger ON post_tags`).
        then(() => {
            queryInterface.dropTable('post_tags');
        });
    },
    up: (queryInterface) => {
        return queryInterface.sequelize.query(`
            CREATE TABLE post_tags (
                post_id BIGINT NOT NULL REFERENCES posts(post_id) ON DELETE RESTRICT,
                tag_id BIGINT NOT NULL REFERENCES tags(tag_id) ON DELETE RESTRICT,
                created_at TIMESTAMP NOT NULL,
                updated_at TIMESTAMP,
                
                CONSTRAINT post_tags_pk PRIMARY KEY (post_id, tag_id)
            );
        
            CREATE TRIGGER timestamp_post_tags_trigger
                BEFORE INSERT OR UPDATE ON post_tags
                FOR EACH ROW
                EXECUTE PROCEDURE register_dates_trigger_body();
        `);
    }
};

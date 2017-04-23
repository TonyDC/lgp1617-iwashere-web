'use strict';

        // language=POSTGRES-PSQL
module.exports = {
    down: (queryInterface) => {
        return queryInterface.sequelize.query(`
            DROP TRIGGER timestamp_content_editors_trigger ON content_editors;
            DROP TABLE content_editors;
        `);
    },

    up: (queryInterface) => {
        return queryInterface.sequelize.query(`
            CREATE TABLE content_editors (
                -- content_editor_id BIGSERIAL PRIMARY KEY,
                uid TEXT PRIMARY KEY,
                created_at TIMESTAMP NOT NULL,
                updated_at TIMESTAMP
            );
            
            CREATE TRIGGER timestamp_content_editors_trigger
                BEFORE INSERT OR UPDATE ON content_editors
                FOR EACH ROW
                EXECUTE PROCEDURE register_dates_trigger_body();
        `);
    }
};

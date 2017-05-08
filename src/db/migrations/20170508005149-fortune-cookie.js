'use strict';

// language=POSTGRES-PSQL
module.exports = {
    down: (queryInterface) => {
        return queryInterface.sequelize.query(`
            DROP TRIGGER timestamp_fortune_cookies_trigger ON fortune_cookies;
            DROP TABLE fortune_cookies;
        `);
    },

    up: (queryInterface) => {
        return queryInterface.sequelize.query(`
            CREATE TABLE fortune_cookies (
                fortune_cookie_id SERIAL PRIMARY KEY,
                description TEXT NOT NULL,
                content_editor_id TEXT NOT NULL REFERENCES content_editors(uid),
                created_at TIMESTAMP NOT NULL,
                updated_at TIMESTAMP
            );
            
            CREATE TRIGGER timestamp_fortune_cookies_trigger
                BEFORE INSERT OR UPDATE ON fortune_cookies
                FOR EACH ROW
                EXECUTE PROCEDURE register_dates_trigger_body();
        `);
    }
};

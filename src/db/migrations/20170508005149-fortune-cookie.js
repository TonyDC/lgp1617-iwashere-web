'use strict';

// language=POSTGRES-PSQL
module.exports = {
    down: (queryInterface) => {
        return queryInterface.sequelize.query(`
            DROP TRIGGER timestamp_fortune_cookies_trigger ON fortune_cookies;
            DROP TRIGGER fortune_cookie_content_editor_trigger ON fortune_cookies;
            DROP FUNCTION fortune_cookie_content_editor_trigger_body();
            DROP TABLE fortune_cookies;
        `);
    },

    up: (queryInterface) => {
        return queryInterface.sequelize.query(`
            CREATE TABLE fortune_cookies (
                fortune_cookie_id SERIAL PRIMARY KEY,
                description TEXT NOT NULL,
                content_editor_id TEXT NOT NULL REFERENCES users(uid) ON DELETE RESTRICT,
                created_at TIMESTAMP NOT NULL,
                updated_at TIMESTAMP
            );
            
            CREATE FUNCTION fortune_cookie_content_editor_trigger_body() RETURNS trigger AS
                $body$
                DECLARE
                    minimum_rank INTEGER;
                    current_rank INTEGER;
                BEGIN
                    SELECT rank INTO minimum_rank FROM roles WHERE name = 'content-editor';
                    SELECT rank FROM users INNER JOIN roles ON (users.role_id = roles.role_id) WHERE roles.name = 'content-editor' AND users.uid = NEW.content_editor_id;
                    
                    -- less rank => more privileges
                    IF (current_rank > minimum_rank) THEN
                        RAISE EXCEPTION 'Content Editor with insufficient privileges';
                    END IF;
                    
                    RETURN NEW;
                END;
                $body$ LANGUAGE plpgsql;
                
            CREATE TRIGGER fortune_cookie_content_editor_trigger
                BEFORE INSERT OR UPDATE ON fortune_cookies
                FOR EACH ROW
                EXECUTE PROCEDURE fortune_cookie_content_editor_trigger_body();
            
            CREATE TRIGGER timestamp_fortune_cookies_trigger
                BEFORE INSERT OR UPDATE ON fortune_cookies
                FOR EACH ROW
                EXECUTE PROCEDURE register_dates_trigger_body();
        `);
    }
};

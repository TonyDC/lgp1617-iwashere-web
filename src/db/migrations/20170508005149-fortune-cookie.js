'use strict';

// language=POSTGRES-PSQL
module.exports = {
    down: (queryInterface) => {
        return queryInterface.sequelize.query(`
            DROP TRIGGER timestamp_fortune_cookies_trigger ON fortune_cookies;
            -- DROP TRIGGER fortune_cookie_content_editor_trigger ON fortune_cookies;
            -- DROP FUNCTION fortune_cookie_content_editor_trigger_body();
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
            
            /*
            -- Deixar esta parte da lógica de negócio para a camada intermédia da aplicação
            CREATE FUNCTION fortune_cookie_content_editor_trigger_body() RETURNS trigger AS
                $body$
                DECLARE
                    minimum_rank INTEGER;
                BEGIN
                    SELECT rank INTO minimum_rank FROM roles WHERE roles.name = 'content-editor';
                    
                    -- less rank => more privileges                
                    IF TG_OP = 'INSERT' AND NOT EXISTS (SELECT * FROM user_contexts INNER JOIN roles ON (user_contexts.role_id = roles.role_id) WHERE user_contexts.user_id = NEW.content_editor_id AND roles.rank <= minimum_rank AND user_contexts.active IS TRUE) THEN
                        RAISE EXCEPTION 'Content Editor with insufficient privileges';
                    END IF;
                    
                    RETURN NEW;
                END;
                $body$ LANGUAGE plpgsql;
                
            CREATE TRIGGER fortune_cookie_content_editor_trigger
                BEFORE INSERT OR UPDATE ON fortune_cookies
                FOR EACH ROW
                EXECUTE PROCEDURE fortune_cookie_content_editor_trigger_body();
                */
            
            CREATE TRIGGER timestamp_fortune_cookies_trigger
                BEFORE INSERT OR UPDATE ON fortune_cookies
                FOR EACH ROW
                EXECUTE PROCEDURE register_dates_trigger_body();
        `);
    }
};

'use strict';

// language=POSTGRES-PSQL
module.exports = {
    down: (queryInterface) => {
        return queryInterface.sequelize.query(`
            DROP TRIGGER timestamp_users_trigger ON users;
            DROP INDEX user_email_index;
            DROP TABLE users;
        `);
    },

    up: (queryInterface) => {
        return queryInterface.sequelize.query(`
            CREATE TABLE users (
                -- user_id BIGSERIAL PRIMARY KEY,
                uid TEXT PRIMARY KEY,
                email TEXT NOT NULL,    -- may not be unique (it can be the same among providers). The registration of users by admins checks whether there exists the email
                name TEXT NOT NULL,     -- TODO should we consider it, since user may change it?
                -- provider 
                suspended BOOL NOT NULL DEFAULT FALSE,
                created_at TIMESTAMP NOT NULL,
                updated_at TIMESTAMP
            );
            
            CREATE INDEX user_email_index ON users USING hash (email);
            
            CREATE TRIGGER timestamp_users_trigger
                BEFORE INSERT OR UPDATE ON users
                FOR EACH ROW
                EXECUTE PROCEDURE register_dates_trigger_body();
                
            -- NOTE: um user pode não estar associado a um contexto (senão, triggers são necessários e transacções -> inserção por funções)
        `);
    }
};

'use strict';

// language=POSTGRES-PSQL
module.exports = {
    down: (queryInterface) => {
        return queryInterface.sequelize.query(`
            DROP TRIGGER timestamp_user_contexts_trigger ON user_contexts;
            DROP TABLE user_contexts;
        `);
    },

    up: (queryInterface) => {
        return queryInterface.sequelize.query(`
            CREATE TABLE user_contexts (
                user_id TEXT NOT NULL REFERENCES users(uid) ON DELETE RESTRICT,
                context_id BIGINT NOT NULL REFERENCES contexts(context_id) ON DELETE RESTRICT,
                active BOOL NOT NULL DEFAULT TRUE,
                created_at TIMESTAMP NOT NULL,
                updated_at TIMESTAMP,
                
                CONSTRAINT user_contexts_pk PRIMARY KEY (user_id, context_id)
            );
            
            -- TODO garantir que context_id é folha
            
            CREATE TRIGGER timestamp_user_contexts_trigger
                BEFORE INSERT OR UPDATE ON user_contexts
                FOR EACH ROW
                EXECUTE PROCEDURE register_dates_trigger_body();
        `);
    }
};

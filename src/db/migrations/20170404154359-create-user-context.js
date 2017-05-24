'use strict';

// language=POSTGRES-PSQL
module.exports = {
    down: (queryInterface) => {
        return queryInterface.sequelize.query(`
            DROP TRIGGER timestamp_user_contexts_trigger ON user_contexts;
            DROP TABLE user_contexts;
        `);
    },
// TODO change BIGINT to INTEGER
    up: (queryInterface) => {
        return queryInterface.sequelize.query(`
            CREATE TABLE user_contexts (
                user_id TEXT NOT NULL REFERENCES users(uid) ON DELETE RESTRICT,
                context_id BIGINT NOT NULL REFERENCES contexts(context_id) ON DELETE RESTRICT,
                role_id BIGINT NOT NULL REFERENCES roles(role_id) ON DELETE RESTRICT,
                active BOOL NOT NULL DEFAULT TRUE,
                created_at TIMESTAMP NOT NULL,
                updated_at TIMESTAMP,
                
                CONSTRAINT user_contexts_pk PRIMARY KEY (user_id, context_id)
            );
            
            /*
            CREATE FUNCTION poi_user_context_trigger_body() RETURNS trigger AS
                $body$
                BEGIN
                    IF EXISTS (SELECT * FROM contexts c1 INNER JOIN contexts c2 ON (c1.context_id = c2.parent_id) WHERE c1.context_id = NEW.context_id) THEN
                        RAISE EXCEPTION 'Context is not a leaf of the tree';
                    END IF;

                    RETURN NEW;
                END;
                $body$ LANGUAGE plpgsql;
                
            CREATE TRIGGER poi_user_context_trigger
                BEFORE INSERT OR UPDATE ON user_contexts
                FOR EACH ROW
                EXECUTE PROCEDURE poi_user_context_trigger_body();
            */
            
            CREATE TRIGGER timestamp_user_contexts_trigger
                BEFORE INSERT OR UPDATE ON user_contexts
                FOR EACH ROW
                EXECUTE PROCEDURE register_dates_trigger_body();
        `);
    }
};

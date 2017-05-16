'use strict';

// language=POSTGRES-PSQL
module.exports = {
    down: (queryInterface) => {
        return queryInterface.sequelize.query(`
            DROP TRIGGER only_one_root_constraint_trigger ON contexts;
            DROP FUNCTION only_one_root_constraint_trigger_body();
            DROP TRIGGER timestamp_contexts_trigger ON contexts;
            DROP TABLE contexts;
        `);
    },

    up: (queryInterface) => {
        return queryInterface.sequelize.query(`
            CREATE TABLE contexts (
                context_id SERIAL PRIMARY KEY,
                name TEXT NOT NULL UNIQUE,
                parent_id BIGINT REFERENCES contexts (context_id) CHECK (parent_id IS NULL OR parent_id != context_id),
                created_at TIMESTAMP NOT NULL,
                updated_at TIMESTAMP
            );
            
            CREATE TRIGGER timestamp_contexts_trigger
                BEFORE INSERT OR UPDATE ON contexts
                FOR EACH ROW
                EXECUTE PROCEDURE register_dates_trigger_body();
                
            -- To prevent florests
            CREATE FUNCTION only_one_root_constraint_trigger_body() RETURNS trigger AS 
            $body$
            DECLARE
                total_count BIGINT;
            BEGIN
                -- Note: since parent relationships is not relexive, there is no need to guarrantee that, at least, one parent_id must be null in the table
                SELECT COUNT(*) INTO total_count FROM contexts WHERE parent_id IS NULL;
            
                IF (total_count > 1) THEN
                    RAISE EXCEPTION 'Only one root may exist' USING HINT = 'Context with NULL parent already exists';
                END IF;
                
                RETURN NEW;
            END;
            $body$ LANGUAGE plpgsql;
            
            CREATE TRIGGER only_one_root_constraint_trigger
                BEFORE INSERT OR UPDATE ON contexts
                FOR EACH ROW
                EXECUTE PROCEDURE only_one_root_constraint_trigger_body();
        `);
    }
};

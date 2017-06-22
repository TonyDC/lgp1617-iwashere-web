'use strict';

// language=POSTGRES-PSQL
module.exports = {
    down: (queryInterface) => {
        return queryInterface.sequelize.query(`
            DROP TRIGGER insert_route_text_trigger ON routes;
            DROP TRIGGER update_route_text_trigger ON routes;
            -- DROP TRIGGER route_content_editor_trigger ON routes;
            -- DROP FUNCTION route_content_editor_trigger_body();
            DROP FUNCTION route_description_trigger_body();
            
            DROP TRIGGER timestamp_routes_trigger ON routes;
            DROP INDEX route_text_index;
            DROP TABLE routes;
        `);
    },

    up: (queryInterface) => {
        return queryInterface.sequelize.query(`
            CREATE TABLE routes (
                route_id BIGSERIAL PRIMARY KEY,
                content_editor_id TEXT NOT NULL REFERENCES users(uid) ON DELETE RESTRICT,
                name TEXT NOT NULL,
                description TEXT NOT NULL,
                text TEXT NOT NULL,
                deleted BOOL NOT NULL DEFAULT FALSE,
                context_id INTEGER NOT NULL REFERENCES contexts(context_id) ON DELETE RESTRICT,
                created_at TIMESTAMP NOT NULL,
                updated_at TIMESTAMP
            );
            
            CREATE INDEX route_text_index ON routes USING GIN (to_tsvector('portuguese', text));
            
            CREATE TRIGGER timestamp_routes_trigger
                BEFORE INSERT OR UPDATE ON routes
                FOR EACH ROW
                EXECUTE PROCEDURE register_dates_trigger_body();
                
            CREATE FUNCTION route_description_trigger_body() RETURNS trigger AS
                $body$
                BEGIN
                    NEW.text := NEW.name || ' ' || NEW.description;
                    RETURN NEW;
                END;
                $body$ LANGUAGE plpgsql;
                
            /*
             -- Deixar esta parte da lógica de negócio para a camada intermédia da aplicação
            CREATE FUNCTION route_content_editor_trigger_body() RETURNS trigger AS
                $body$
                DECLARE
                    minimum_rank INTEGER;
                BEGIN
                    SELECT rank INTO minimum_rank FROM roles WHERE roles.name = 'content-editor';
                    
                    -- less rank => more privileges                
                    IF TG_OP = 'INSERT' AND NOT EXISTS (SELECT * FROM user_contexts INNER JOIN roles ON (user_contexts.role_id = roles.role_id) WHERE user_contexts.user_id = NEW.content_editor_id AND roles.rank <= minimum_rank AND user_contexts.active IS TRUE) THEN
                        RAISE EXCEPTION 'Content Editor with insufficient privileges';
                    END IF;
                    
                    
                    -- Extra: testar se o contexto é válido, tendo em conta o contexto a que o user pertence
                    IF NOT EXISTS (
                          WITH RECURSIVE children(context_id, parent_id, name) AS (
                                SELECT context_id, parent_id, name FROM contexts WHERE context_id = NEW.context_id
                                    UNION
                                SELECT c.context_id, c.parent_id, c.name
                                FROM children p, contexts c
                                WHERE p.context_id = c.parent_id
                          ) SELECT * FROM children WHERE context_id IN (SELECT context_id FROM user_contexts WHERE user_id = NEW.content_editor_id)
                    ) THEN 
                        RAISE EXCEPTION 'Content Editor does not belong to the given context';
                    END IF;
                    
                    
                    RETURN NEW;
                END;
                $body$ LANGUAGE plpgsql;
                
            CREATE TRIGGER route_content_editor_trigger
                BEFORE INSERT OR UPDATE ON routes
                FOR EACH ROW
                EXECUTE PROCEDURE route_content_editor_trigger_body();
            */
                
            CREATE TRIGGER update_route_text_trigger
                BEFORE UPDATE ON routes
                FOR EACH ROW
                WHEN (OLD.name != NEW.name OR OLD.description != NEW.description)
                EXECUTE PROCEDURE route_description_trigger_body();
                
            CREATE TRIGGER insert_route_text_trigger
                BEFORE INSERT ON routes
                FOR EACH ROW
                EXECUTE PROCEDURE route_description_trigger_body();
        `);
    }
};

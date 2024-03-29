'use strict';

// language=POSTGRES-PSQL
module.exports = {
    down: (queryInterface) => {

        return queryInterface.sequelize.query(`
            DROP TRIGGER timestamp_pois_trigger ON pois;
            DROP TRIGGER insert_poi_text_trigger ON pois;
            DROP TRIGGER update_poi_text_trigger ON pois;
            -- DROP TRIGGER poi_content_editor_trigger ON pois;
            -- DROP FUNCTION poi_content_editor_trigger_body();
            DROP FUNCTION poi_description_trigger_body();
            
            DROP INDEX poi_text_index;
            DROP INDEX poi_latitude_longitude_index;
            
            DROP TABLE pois;
        `);
    },

    up: (queryInterface) => {
        return queryInterface.sequelize.query(`
            CREATE TABLE pois (
                poi_id BIGSERIAL PRIMARY KEY,
                name TEXT NOT NULL,
                description TEXT NOT NULL,
                meta_info TEXT,
                address TEXT NOT NULL,
                text TEXT NOT NULL,
                latitude DOUBLE PRECISION NOT NULL,
                longitude DOUBLE PRECISION NOT NULL,
                poi_type_id BIGINT NOT NULL REFERENCES poi_types(poi_type_id) ON DELETE RESTRICT,
                parent_id BIGINT REFERENCES pois (poi_id) ON DELETE RESTRICT CHECK (parent_id IS NULL OR parent_id != poi_id),
                content_editor_id TEXT NOT NULL REFERENCES users(uid) ON DELETE RESTRICT,
                update_content_editor_id TEXT REFERENCES users(uid) ON DELETE RESTRICT,
                context_id INTEGER NOT NULL REFERENCES contexts(context_id) ON DELETE RESTRICT,
                deleted BOOL NOT NULL DEFAULT FALSE,
                created_at TIMESTAMP NOT NULL,
                updated_at TIMESTAMP
            );
        
            CREATE INDEX poi_latitude_longitude_index ON pois USING BTREE (latitude, longitude);
            CREATE INDEX poi_text_index ON pois USING GIN (to_tsvector('portuguese', text));
            
            CREATE FUNCTION poi_description_trigger_body() RETURNS trigger AS
                $body$
                BEGIN
                    NEW.text := NEW.name || ' ' || NEW.description || ' ' || NEW.address;
                    RETURN NEW;
                END;
                $body$ LANGUAGE plpgsql;
                
            /*
            -- Deixar esta parte da lógica de negócio para a camada intermédia da aplicação
            CREATE FUNCTION poi_content_editor_trigger_body() RETURNS trigger AS
                $body$
                DECLARE
                    minimum_rank INTEGER;
                BEGIN
                    SELECT rank INTO minimum_rank FROM roles WHERE roles.name = 'content-editor';
                    
                    -- less rank => more privileges                
                    IF TG_OP = 'INSERT' AND NOT EXISTS (SELECT * FROM user_contexts INNER JOIN roles ON (user_contexts.role_id = roles.role_id) WHERE user_contexts.user_id = NEW.content_editor_id AND roles.rank <= minimum_rank AND user_contexts.active IS TRUE) THEN
                        RAISE EXCEPTION 'Content Editor with insufficient privileges';
                    END IF;
                    
                    
                    -- TODO testar se o contexto é válido, tendo em conta o contexto a que o user pertence
                    -- TODO o user que está a criar tem de pertencer a um contexto
                    -- Nota: impede que o user mude de contexto
                    -- Nota: estas restrições devem passar para a camada intermédia (servidor)
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
                
            CREATE TRIGGER poi_content_editor_trigger
                BEFORE INSERT OR UPDATE ON pois
                FOR EACH ROW
                EXECUTE PROCEDURE poi_content_editor_trigger_body();
            */
                        
            CREATE TRIGGER update_poi_text_trigger
                BEFORE UPDATE ON pois
                FOR EACH ROW
                WHEN (OLD.name != NEW.name OR OLD.description != NEW.description OR OLD.address != NEW.address)
                EXECUTE PROCEDURE poi_description_trigger_body();
                
            CREATE TRIGGER insert_poi_text_trigger
                BEFORE INSERT ON pois
                FOR EACH ROW
                EXECUTE PROCEDURE poi_description_trigger_body();
                
            CREATE TRIGGER timestamp_pois_trigger
                BEFORE INSERT OR UPDATE ON pois
                FOR EACH ROW
                EXECUTE PROCEDURE register_dates_trigger_body();
        `);
    }
};

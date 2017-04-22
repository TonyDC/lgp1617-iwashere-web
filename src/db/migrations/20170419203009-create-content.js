'use strict';

// language=POSTGRES-PSQL
module.exports = {
    down: (queryInterface) => {
        return queryInterface.sequelize.query(`
            DROP TRIGGER timestamp_contents_trigger ON contents;
            DROP TABLE contents;
        `);
    },

    up: (queryInterface) => {
        return queryInterface.sequelize.query(`
            CREATE TABLE contents (
                id BIGSERIAL PRIMARY KEY,
                url TEXT NOT NULL,
                type INTEGER NOT NULL REFERENCES content_types(id) ON DELETE RESTRICT,
                post BIGINT NOT NULL REFERENCES posts(id) ON DELETE RESTRICT,
                created_at TIMESTAMP NOT NULL,
                updated_at TIMESTAMP
            );
            
            CREATE TRIGGER timestamp_contents_trigger
                BEFORE INSERT OR UPDATE ON contents
                FOR EACH ROW
                EXECUTE PROCEDURE register_dates_trigger_body();
        `);
    }
};

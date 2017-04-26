'use strict';

// language=POSTGRES-PSQL
module.exports = {
    down: (queryInterface) => {
        return queryInterface.sequelize.query(`
            DROP TRIGGER timestamp_tags_trigger ON tags;
            DROP TABLE tags;
        `);
    },
    up: (queryInterface) => {
        return queryInterface.sequelize.query(`
            CREATE TABLE tags (
                tag_id SERIAL PRIMARY KEY,
                name TEXT NOT NULL UNIQUE,
                created_at TIMESTAMP NOT NULL,
                updated_at TIMESTAMP
            );
        
            CREATE TRIGGER timestamp_tags_trigger
                BEFORE INSERT OR UPDATE ON tags
                FOR EACH ROW
                EXECUTE PROCEDURE register_dates_trigger_body();
        `);
    }
};

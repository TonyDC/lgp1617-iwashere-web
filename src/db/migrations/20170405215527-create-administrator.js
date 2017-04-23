'use strict';

        // language=POSTGRES-PSQL
module.exports = {
    down: (queryInterface) => {
        return queryInterface.sequelize.query(`
            DROP TRIGGER timestamp_administrators_trigger ON administrators;
            DROP TABLE administrators;
        `);
    },

    up: (queryInterface) => {
        return queryInterface.sequelize.query(`
            CREATE TABLE administrators (
                -- administrator_id BIGSERIAL PRIMARY KEY,
                uid TEXT PRIMARY KEY,
                created_at TIMESTAMP NOT NULL,
                updated_at TIMESTAMP
            );
            
            CREATE TRIGGER timestamp_administrators_trigger
                BEFORE INSERT OR UPDATE ON administrators
                FOR EACH ROW
                EXECUTE PROCEDURE register_dates_trigger_body();
        `);
    }
};

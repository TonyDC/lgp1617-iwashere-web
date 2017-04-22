'use strict';

// language=POSTGRES-PSQL
module.exports = {
    down: (queryInterface) => {
        return queryInterface.sequelize.query(`
            DROP TRIGGER timestamp_super_administrators_trigger ON super_administrators;
            DROP TABLE super_administrators;
        `);
    },

    up: (queryInterface) => {
        return queryInterface.sequelize.query(`
            CREATE TABLE super_administrators (
                super_administrator_id BIGSERIAL PRIMARY KEY,
                uid TEXT NOT NULL,
                created_at TIMESTAMP NOT NULL,
                updated_at TIMESTAMP
            );
            
            CREATE TRIGGER timestamp_super_administrators_trigger
                BEFORE INSERT OR UPDATE ON super_administrators
                FOR EACH ROW
                EXECUTE PROCEDURE register_dates_trigger_body();
        `);
    }
};

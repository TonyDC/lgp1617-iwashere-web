'use strict';

// language=POSTGRES-PSQL
module.exports = {
    down: (queryInterface) => {
        return queryInterface.sequelize.query(`
            DROP TRIGGER timestamp_roles_trigger ON roles;
            DROP TABLE roles;
        `);
    },

    up: (queryInterface) => {
        return queryInterface.sequelize.query(`
            CREATE TABLE roles (
                role_id SERIAL PRIMARY KEY,
                name TEXT NOT NULL UNIQUE,
                rank INTEGER NOT NULL,          -- TODO BITMAP INDEX
                created_at TIMESTAMP NOT NULL,
                updated_at TIMESTAMP
            );
            
            CREATE TRIGGER timestamp_roles_trigger
                BEFORE INSERT OR UPDATE ON roles
                FOR EACH ROW
                EXECUTE PROCEDURE register_dates_trigger_body();
        `);
    }
};

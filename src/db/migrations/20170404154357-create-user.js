'use strict';

// language=POSTGRES-PSQL
module.exports = {
    down: (queryInterface) => {
        return queryInterface.sequelize.query(`
            DROP TRIGGER timestamp_users_trigger ON users;
            DROP TABLE users;
        `);
    },

    up: (queryInterface) => {
        return queryInterface.sequelize.query(`
            CREATE TABLE users (
                id BIGSERIAL PRIMARY KEY,
                uid TEXT NOT NULL,
                role_id INTEGER NOT NULL REFERENCES roles(id),
                created_at TIMESTAMP NOT NULL,
                updated_at TIMESTAMP
            );
            
            CREATE TRIGGER timestamp_users_trigger
                BEFORE INSERT OR UPDATE ON users
                FOR EACH ROW
                EXECUTE PROCEDURE register_dates_trigger_body();
        `);
    }
};
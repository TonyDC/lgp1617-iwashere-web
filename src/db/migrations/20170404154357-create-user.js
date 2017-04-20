'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('users', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.BIGINT
            },
            uid: {
                allowNull: false,
                type: Sequelize.STRING,
                unique: true
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                type: Sequelize.DATE
            }
        }).
        then(() => {
            // language=POSTGRES-PSQL
            return queryInterface.sequelize.query(`
                CREATE TRIGGER timestamp_users_trigger
                BEFORE INSERT OR UPDATE ON users
                FOR EACH ROW
                EXECUTE PROCEDURE register_dates_trigger_body()`);
        });
    },

    down: (queryInterface, Sequelize) => {
        // language=POSTGRES-PSQL
        return queryInterface.sequelize.query(`DROP TRIGGER timestamp_users_trigger ON users`).
        then(() => {
            return queryInterface.dropTable('users');
        });
    }
};

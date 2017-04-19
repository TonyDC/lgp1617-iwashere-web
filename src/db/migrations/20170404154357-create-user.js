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
                allowNull: false,
                type: Sequelize.DATE
            }
        }).
        then(() => {
            return queryInterface.sequelize.query(`
                CREATE TRIGGER insert_users_trigger
                BEFORE INSERT ON users
                FOR EACH ROW
                EXECUTE PROCEDURE register_dates_trigger_body()`);
        }).
        then(() => {
            return queryInterface.sequelize.query(`
                CREATE TRIGGER update_users_trigger
                BEFORE INSERT ON users
                FOR EACH ROW
                EXECUTE PROCEDURE register_dates_trigger_body()`);
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.query(`DROP TRIGGER update_users_trigger ON users`).
        then(() => {
            return queryInterface.sequelize.query(`DROP TRIGGER insert_users_trigger ON users`);
        }).
        then(() => {
            return queryInterface.dropTable('users');
        });
    }
};

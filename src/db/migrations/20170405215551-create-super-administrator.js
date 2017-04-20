'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('super_administrators', {
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
                CREATE TRIGGER timestamp_super_administrators_trigger
                BEFORE INSERT OR UPDATE ON super_administrators
                FOR EACH ROW
                EXECUTE PROCEDURE register_dates_trigger_body()`);
        });
    },
    down: function(queryInterface, Sequelize) {
        // language=POSTGRES-PSQL
        return queryInterface.sequelize.query(`DROP TRIGGER timestamp_super_administrators_trigger ON super_administrators`).
        then(() => {
            return queryInterface.dropTable('super_administrators');
        });
    }
};

'use strict';

module.exports = {
    down: (queryInterface) => {
        // language=POSTGRES-PSQL
        return queryInterface.sequelize.query(`DROP TRIGGER timestamp_super_administrators_trigger ON super_administrators`).
        then(() => {
            return queryInterface.dropTable('super_administrators');
        });
    },
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('super_administrators', {
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
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
            updatedAt: { type: Sequelize.DATE }
        }).
        then(() => {
            // language=POSTGRES-PSQL
            return queryInterface.sequelize.query(`
                CREATE TRIGGER timestamp_super_administrators_trigger
                BEFORE INSERT OR UPDATE ON super_administrators
                FOR EACH ROW
                EXECUTE PROCEDURE register_dates_trigger_body()`);
        });
    }
};

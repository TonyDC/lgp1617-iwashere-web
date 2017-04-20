'use strict';

module.exports = {
    down: (queryInterface) => {
        // language=POSTGRES-PSQL
        return queryInterface.sequelize.query(`DROP TRIGGER timestamp_administrators_trigger ON administrators`).
        then(() => {
            return queryInterface.dropTable('administrators');
        });
    },
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('administrators', {
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
                CREATE TRIGGER timestamp_administrators_trigger
                BEFORE INSERT OR UPDATE ON administrators
                FOR EACH ROW
                EXECUTE PROCEDURE register_dates_trigger_body()`);
        });
    }
};

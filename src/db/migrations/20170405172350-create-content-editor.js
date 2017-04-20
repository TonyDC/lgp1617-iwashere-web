'use strict';

module.exports = {
    down: (queryInterface) => {
        // language=POSTGRES-PSQL
        return queryInterface.sequelize.query(`DROP TRIGGER timestamp_content_editors_trigger ON content_editors`).
        then(() => {
            return queryInterface.dropTable('content_editors');
        });
    },
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('content_editors', {
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
                CREATE TRIGGER timestamp_content_editors_trigger
                BEFORE INSERT OR UPDATE ON content_editors
                FOR EACH ROW
                EXECUTE PROCEDURE register_dates_trigger_body()`);
        });
    }
};

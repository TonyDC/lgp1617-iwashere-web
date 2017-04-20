'use strict';

module.exports = {
    down: (queryInterface) => {
        return queryInterface.sequelize.query(`DROP TRIGGER timestamp_tag_trigger ON tags`).
        then(() => {
            queryInterface.dropTable('tags');
        });
    },
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('tags', {
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
            name: {
                allowNull: true,
                type: Sequelize.STRING,
                unique: true
            },
            updatedAt: { type: Sequelize.DATE }
        }).
        then(() => {
            // language=POSTGRES-PSQL
            return queryInterface.sequelize.query(`
                CREATE TRIGGER timestamp_tag_trigger
                BEFORE INSERT OR UPDATE ON tags
                FOR EACH ROW
                EXECUTE PROCEDURE register_dates_trigger_body()`);
        });
    }
};

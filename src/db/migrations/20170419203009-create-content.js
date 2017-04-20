'use strict';

module.exports = {
    down: (queryInterface) => {
        return queryInterface.sequelize.query(`DROP TRIGGER timestamp_contents_trigger ON contents`).
        then(() => {
            queryInterface.dropTable('contents');
        });
    },
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('contents', {
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
            type: {
                allowNull: false,
                type: Sequelize.ENUM,
                values: ['TXT', 'IMG', 'VID', 'AUD']
            },
            updatedAt: { type: Sequelize.DATE }
        }).
        then(() => {
            // language=POSTGRES-PSQL
            return queryInterface.sequelize.query(`
                CREATE TRIGGER timestamp_contents_trigger
                BEFORE INSERT OR UPDATE ON contents
                FOR EACH ROW
                EXECUTE PROCEDURE register_dates_trigger_body()`);
        });
    }
};

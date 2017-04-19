'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('media', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.BIGINT
            },
            url: {
                allowNull: false,
                type: Sequelize.STRING,
                unique: true
            },
            type: {
                allowNull: false,
                type: Sequelize.ENUM,
                values: ['TXT', 'IMG', 'VID']
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
                CREATE TRIGGER insert_media_trigger
                BEFORE INSERT ON media
                FOR EACH ROW
                EXECUTE PROCEDURE register_dates_trigger_body()`);
        }).
        then(() => {
            // language=POSTGRES-PSQL
            return queryInterface.sequelize.query(`
                CREATE TRIGGER update_media_trigger
                BEFORE INSERT ON media
                FOR EACH ROW
                EXECUTE PROCEDURE register_dates_trigger_body()`);
        });
    },
    down: (queryInterface, Sequelize) => {
        // language=POSTGRES-PSQL
        return queryInterface.sequelize.query(`DROP TRIGGER update_media_trigger ON media`).
        then(() => {
            // language=POSTGRES-PSQL
            return queryInterface.sequelize.query(`DROP TRIGGER insert_media_trigger ON media`);
        }).
        then(() => {
            return queryInterface.dropTable('media');
        });
    }
};

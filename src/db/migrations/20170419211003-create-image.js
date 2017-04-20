'use strict';

module.exports = {
    down: (queryInterface) => {
        return queryInterface.sequelize.query(`DROP TRIGGER timestamp_images_trigger ON images`).
        then(() => {
            queryInterface.dropTable('images');
        });
    },
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('images', {
            content_id: {
                allowNull: false,
                onDelete: 'cascade',
                onUpdate: 'cascade',
                references: {
                    key: 'id',
                    model: 'contents'
                },
                type: Sequelize.BIGINT
            },
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
            updatedAt: { type: Sequelize.DATE },
            url: {
                allowNull: true,
                type: Sequelize.STRING
            }
        }).
        then(() => {
            // language=POSTGRES-PSQL
            return queryInterface.sequelize.query(`
                CREATE TRIGGER timestamp_images_trigger
                BEFORE INSERT OR UPDATE ON images
                FOR EACH ROW
                EXECUTE PROCEDURE register_dates_trigger_body()`);
        });
    }
};

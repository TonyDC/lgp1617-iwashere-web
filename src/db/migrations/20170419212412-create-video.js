'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('videos', {
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
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.BIGINT
            },
            url: {
                allowNull: true,
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
                CREATE TRIGGER timestamp_videos_trigger
                BEFORE INSERT OR UPDATE ON videos
                FOR EACH ROW
                EXECUTE PROCEDURE register_dates_trigger_body()`);
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.query(`DROP TRIGGER timestamp_videos_trigger ON videos`).
        then(() => {
            queryInterface.dropTable('videos');
        });
    }
};

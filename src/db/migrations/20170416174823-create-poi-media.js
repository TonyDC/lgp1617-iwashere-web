'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('poi_media', {
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
            media_id: {
                onDelete: 'cascade',
                onUpdate: 'cascade',
                references: {
                    key: 'id',
                    model: 'media'
                },
                type: Sequelize.BIGINT
            },
            poi_id: {
                onDelete: 'cascade',
                onUpdate: 'cascade',
                references: {
                    key: 'id',
                    model: 'pois'
                },
                type: Sequelize.BIGINT
            },
            updatedAt: {
                type: Sequelize.DATE
            }
        }).
        then(() => {
            // language=POSTGRES-PSQL
            return queryInterface.sequelize.query(`
                CREATE TRIGGER insert_poi_media_trigger
                BEFORE INSERT ON poi_media
                FOR EACH ROW
                EXECUTE PROCEDURE register_dates_trigger_body()`);
        }).
        then(() => {
            // language=POSTGRES-PSQL
            return queryInterface.sequelize.query(`
                CREATE TRIGGER update_poi_media_trigger
                BEFORE INSERT ON poi_media
                FOR EACH ROW
                EXECUTE PROCEDURE register_dates_trigger_body()`);
        });
    },
    down: (queryInterface, Sequelize) => {
        // language=POSTGRES-PSQL
        return queryInterface.sequelize.query(`DROP TRIGGER update_poi_media_trigger ON poi_media`).
        then(() => {
            // language=POSTGRES-PSQL
            return queryInterface.sequelize.query(`DROP TRIGGER insert_poi_media_trigger ON poi_media`);
        }).
        then(() => {
            return queryInterface.dropTable('poi_media');
        });
    }
};

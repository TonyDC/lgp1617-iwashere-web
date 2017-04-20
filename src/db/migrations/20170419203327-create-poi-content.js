'use strict';

module.exports = {
    down: (queryInterface) => {
        return queryInterface.sequelize.query(`DROP TRIGGER timestamp_poi_content_trigger ON poi_content`).
        then(() => {
            queryInterface.dropTable('poi_content');
        });
    },
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('poi_content', {
            content_id: {
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
            poi_id: {
                onDelete: 'cascade',
                onUpdate: 'cascade',
                references: {
                    key: 'id',
                    model: 'pois'
                },
                type: Sequelize.BIGINT
            },
            updatedAt: { type: Sequelize.DATE }
        }).
        then(() => {
            // language=POSTGRES-PSQL
            return queryInterface.sequelize.query(`
                CREATE TRIGGER timestamp_poi_content_trigger
                BEFORE INSERT OR UPDATE ON poi_content
                FOR EACH ROW
                EXECUTE PROCEDURE register_dates_trigger_body()`);
        });
    }
};

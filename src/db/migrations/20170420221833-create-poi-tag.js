'use strict';

module.exports = {
    down: (queryInterface) => {
        return queryInterface.sequelize.query(`DROP TRIGGER timestamp_poi_tags_trigger ON poi_tags`).
        then(() => {
            queryInterface.dropTable('poi_tags');
        });
    },
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('poi_tags', {
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
                allowNull: false,
                onDelete: 'cascade',
                onUpdate: 'cascade',
                references: {
                    key: 'id',
                    model: 'pois'
                },
                type: Sequelize.BIGINT,
                unique: 'uniquePOIRating'
            },
            tag_id: {
                allowNull: false,
                onDelete: 'cascade',
                onUpdate: 'cascade',
                references: {
                    key: 'id',
                    model: 'tags'
                },
                type: Sequelize.BIGINT,
                unique: 'uniquePOIRating'
            },
            updatedAt: { type: Sequelize.DATE }
        }).
        then(() => {
            // language=POSTGRES-PSQL
            return queryInterface.sequelize.query(`
                CREATE TRIGGER timestamp_poi_tags_trigger
                BEFORE INSERT OR UPDATE ON poi_tags
                FOR EACH ROW
                EXECUTE PROCEDURE register_dates_trigger_body()`);
        });
    }
};

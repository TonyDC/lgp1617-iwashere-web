'use strict';

module.exports = {
    down: (queryInterface) => {
        return queryInterface.sequelize.query(`DROP TRIGGER timestamp_post_tags_trigger ON post_tags`).
        then(() => {
            queryInterface.dropTable('post_tags');
        });
    },
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('post_tags', {
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
            post_id: {
                allowNull: false,
                onDelete: 'cascade',
                onUpdate: 'cascade',
                references: {
                    key: 'id',
                    model: 'posts'
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
                CREATE TRIGGER timestamp_post_tags_trigger
                BEFORE INSERT OR UPDATE ON post_tags
                FOR EACH ROW
                EXECUTE PROCEDURE register_dates_trigger_body()`);
        });
    }
};

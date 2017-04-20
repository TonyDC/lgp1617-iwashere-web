'use strict';

module.exports = {
    down: (queryInterface) => {
        return queryInterface.sequelize.query(`DROP TRIGGER timestamp_post_trigger ON posts`).
        then(() => {
            queryInterface.dropTable('posts');
        });
    },
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('posts', {
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
            description: {
                allowNull: true,
                type: Sequelize.TEXT
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
                type: Sequelize.BIGINT
            },
            updatedAt: { type: Sequelize.DATE },
            user_id: {
                allowNull: false,
                onDelete: 'cascade',
                onUpdate: 'cascade',
                references: {
                    key: 'uid',
                    model: 'users'
                },
                type: Sequelize.STRING
            }
        }).
        then(() => {
            // language=POSTGRES-PSQL
            return queryInterface.sequelize.query(`
                CREATE TRIGGER timestamp_post_trigger
                BEFORE INSERT OR UPDATE ON posts
                FOR EACH ROW
                EXECUTE PROCEDURE register_dates_trigger_body()`);
        });
    }
};

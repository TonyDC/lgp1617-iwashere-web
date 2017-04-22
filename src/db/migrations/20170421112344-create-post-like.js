'use strict';

module.exports = {
    down: (queryInterface) => {
        return queryInterface.sequelize.query(`DROP TRIGGER timestamp_post_likes_trigger ON post_likes`).
        then(() => {
            queryInterface.dropTable('post_likes');
        });
    },
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('post_likes', {
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
                unique: 'uniquePostLike'
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
                type: Sequelize.STRING,
                unique: 'uniquePostLike'
            }
        }).
        then(() => {
            // language=POSTGRES-PSQL
            return queryInterface.sequelize.query(`
                CREATE TRIGGER timestamp_post_likes_trigger
                BEFORE INSERT OR UPDATE ON post_likes
                FOR EACH ROW
                EXECUTE PROCEDURE register_dates_trigger_body()`);
        });
    }
};

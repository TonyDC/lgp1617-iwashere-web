'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('posts', {
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
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
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
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
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('post');
    }
};

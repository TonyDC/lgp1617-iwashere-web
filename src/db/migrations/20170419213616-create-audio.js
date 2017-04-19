'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('audio', {
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
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('audio');
    }
};

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
                type: Sequelize.INTEGER
            },
            mediaId: {
                onDelete: 'cascade',
                onUpdate: 'cascade',
                references: {
                    key: "id",
                    model: "media"
                },
                type: Sequelize.INTEGER
            },
            poiId: {
                onDelete: 'cascade',
                onUpdate: 'cascade',
                references: {
                    key: "id",
                    model: "pois"
                },
                type: Sequelize.INTEGER
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('poi_media');
    }
};

'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('poi_ratings', {
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
                values: [0, 1, 2, 3, 4, 5],
                type: Sequelize.BIGINT,
                unique: 'uniquePOIRating'
            },
            rating: {
                allowNull: false,
                type: Sequelize.INTEGER
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
                type: Sequelize.STRING,
                unique: 'uniquePOIRating'
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('poi_ratings');
    }
};

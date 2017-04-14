'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('POIs', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: {
                allowNull: false,
                type: Sequelize.STRING
            },
            description: {
                allowNull: false,
                type: Sequelize.STRING
            },
            latitude: {
                allowNull: false,
                type: Sequelize.INTEGER
            },
            longitude: {
                allowNull: false,
                type: Sequelize.INTEGER
            },
            address: {
                allowNull: false,
                type: Sequelize.STRING
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        }).
        then(() => {
            // language=POSTGRES-SQL
            return queryInterface.sequelize.query(`CREATE INDEX "POI_latitude_longitude_index" ON "POIs" USING BTREE ("latitude", "longitude")`);
        }).
        then(() => {
            // language=POSTGRES-SQL
            return queryInterface.sequelize.query(`CREATE INDEX "POI_description_index" ON "POIs" USING GIN (to_tsvector('portuguese', "name"))`);
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.removeIndex('POIs', 'POI_latitude_longitude_index').
        then(() => {
            return queryInterface.removeIndex('POIs', 'POI_description_index');
        }).
        then(() => {
            return queryInterface.dropTable('POIs');
        });
    }
};

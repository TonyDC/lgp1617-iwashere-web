'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('pois', {
            address: {
                allowNull: false,
                type: Sequelize.STRING
            },
            description: {
                allowNull: false,
                type: Sequelize.STRING
            },
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.BIGINT
            },
            latitude: {
                allowNull: false,
                type: Sequelize.REAL
            },
            longitude: {
                allowNull: false,
                type: Sequelize.REAL
            },
            name: {
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
            return queryInterface.sequelize.query(`CREATE INDEX "poi_latitude_longitude_index" ON "pois" USING BTREE ("latitude", "longitude")`);
        }).
        then(() => {
            // language=POSTGRES-SQL
            return queryInterface.sequelize.query(`CREATE INDEX "poi_description_index" ON "pois" USING GIN (to_tsvector('portuguese', "name"))`);
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.removeIndex('pois', 'poi_latitude_longitude_index').
        then(() => {
            return queryInterface.removeIndex('pois', 'poi_description_index');
        }).
        then(() => {
            return queryInterface.dropTable('pois');
        });
    }
};

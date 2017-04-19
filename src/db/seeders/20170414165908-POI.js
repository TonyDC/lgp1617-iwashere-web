'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('pois', [
            {
                address: 'R. Dr. Roberto Frias, 4200-464 Porto',
                description: 'A melhor faculdade de engenharia do país',
                latitude: 41.1785734,
                longitude: -8.598412,
                name: 'Faculdade de Engenharia da Universidade do Porto',
            }
        ], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('pois', null, {});
    }
};

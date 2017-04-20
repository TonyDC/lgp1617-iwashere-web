'use strict';

const moment = require('moment');

const TODAY = moment().format();

module.exports = {
    up: (queryInterface, Sequelize) => {
        /*
         Add altering commands here.
         Return a promise to correctly handle asynchronicity.

         Example:
         return queryInterface.bulkInsert('Person', [{
         name: 'John Doe',
         isBetaMember: false
         }], {});
         */

        return queryInterface.bulkInsert('pois', [
            {
                address: 'R. Dr. Roberto Frias, 4200-464 Porto',
                description: 'A melhor faculdade de engenharia do país',
                latitude: 41.1785734,
                longitude: -8.598412,
                name: 'Faculdade de Engenharia da Universidade do Porto',
                createdAt: TODAY,
                updatedAt: TODAY
            }
        ], {});
    },

    down: (queryInterface, Sequelize) => {
        /*
         Add reverting commands here.
         Return a promise to correctly handle asynchronicity.

         Example:
         return queryInterface.bulkDelete('Person', null, {});
         */
        return queryInterface.bulkDelete('pois', null, {});
    }
};

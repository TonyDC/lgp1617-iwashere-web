'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {

        return queryInterface.bulkInsert('media', [
            {
                type: 'IMG',
                url: 'http://lorempixel.com/400/200'
            }
        ], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('media', null, {});
    }
};

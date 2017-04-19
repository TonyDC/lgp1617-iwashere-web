'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {

        return queryInterface.bulkInsert('images', [
            {
                content_id: 1,
                url: 'http://lorempixel.com/400/200'
            }
        ], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('images', null, {});
    }
};

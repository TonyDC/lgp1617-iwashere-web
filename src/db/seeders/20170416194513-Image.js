'use strict';

module.exports = {
    down: (queryInterface) => {
        return queryInterface.bulkDelete('images', null, {});
    },
    up: (queryInterface) => {

        return queryInterface.bulkInsert('images', [
            {
                content_id: 1,
                url: 'http://lorempixel.com/400/200'
            }
        ], {});
    }
};

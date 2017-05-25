'use strict';

module.exports = {
    down: (queryInterface) => {
        return queryInterface.bulkDelete('poi_types', null, {});
    },
    up: (queryInterface) => {
        return queryInterface.bulkInsert('poi_types', [
            { name: 'place;lugar' },
            { name: 'object;objeto' }

        ], {});
    }
};

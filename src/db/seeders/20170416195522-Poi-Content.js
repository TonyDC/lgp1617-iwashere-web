'use strict';

module.exports = {
    down: (queryInterface) => {
        return queryInterface.bulkDelete('poi_contents', null, {});
    },
    up: (queryInterface) => {

        return queryInterface.bulkInsert('poi_contents', [
            {
                content_type_id: 1,
                hash: 'lskbfalhb324231ihdlsjffwe24',
                poi_id: 1,
                url: 'http://lorempixel.com/300/100'
            },
            {
                content_type_id: 1,
                hash: 'lskbfalhb324231ihdls3ffwe34',
                poi_id: 1,
                url: 'http://lorempixel.com/300/100'
            }
        ], {});
    }
};

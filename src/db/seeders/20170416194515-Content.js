'use strict';

module.exports = {
    down: (queryInterface) => {
        return queryInterface.bulkDelete('contents', null, {});
    },
    up: (queryInterface) => {

        return queryInterface.bulkInsert('contents', [
            {
                content_type_id: 1,
                hash: 'lskbfalhb324231ihdlsjffwe34',
                post_id: 1,
                url: 'http://lorempixel.com/300/100'
            }
        ], {});
    }
};

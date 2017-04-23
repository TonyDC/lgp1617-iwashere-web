'use strict';

module.exports = {
    down: (queryInterface) => {
        return queryInterface.bulkDelete('post_tags', null, {});
    },
    up: (queryInterface) => {

        return queryInterface.bulkInsert('post_tags', [
            {
                post_id: 1,
                tag_id: 1
            },
            {
                post_id: 1,
                tag_id: 2
            }
        ], {});
    }
};

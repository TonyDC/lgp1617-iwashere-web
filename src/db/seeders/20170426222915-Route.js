'use strict';

module.exports = {
    down: (queryInterface) => {
        return queryInterface.bulkDelete('routes', null, {});
    },
    up: (queryInterface) => {

        return queryInterface.bulkInsert('routes', [
            {
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                description: 'The first route'
            },
            {
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                description: 'The second route'
            }
        ], {});
    }
};

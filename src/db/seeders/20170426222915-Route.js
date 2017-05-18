'use strict';

module.exports = {
    down: (queryInterface) => {
        return queryInterface.bulkDelete('routes', null, {});
    },
    up: (queryInterface) => {

        return queryInterface.bulkInsert('routes', [
            {
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                context_id: 2,
                description: 'The first route',
                name: 'The first route name'
            },
            {
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                context_id: 2,
                description: 'The second route',
                name: 'The second route name'
            }
        ], {});
    }
};

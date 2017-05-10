'use strict';

module.exports = {
    down: (queryInterface) => {
        return queryInterface.bulkDelete('fortune_cookies', null, {});
    },
    up: (queryInterface) => {

        return queryInterface.bulkInsert('fortune_cookies', [
            {
                content_editor_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                description: 'Today, it is a nice day'
            }
        ], {});
    }
};

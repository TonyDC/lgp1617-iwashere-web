'use strict';

module.exports = {
    down: (queryInterface) => {
        return queryInterface.bulkDelete('post_contents', null, {});
    },
    up: (queryInterface) => {

        return queryInterface.bulkInsert('post_contents', [
            {
                content_type_id: 1,
                post_id: 1,
                url_l: 'gs://iwashere-mobile.appspot.com/Updated_Map2.png',
                url_m: 'gs://iwashere-mobile.appspot.com/Updated_Map2.png',
                url_s: 'gs://iwashere-mobile.appspot.com/Updated_Map2.png',
                url_xs: 'gs://iwashere-mobile.appspot.com/Updated_Map2.png'
            }
        ], {});
    }
};

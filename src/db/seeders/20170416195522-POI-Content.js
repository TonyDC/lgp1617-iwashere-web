'use strict';

module.exports = {
    down: (queryInterface) => {
        return queryInterface.bulkDelete('poi_contents', null, {});
    },
    up: (queryInterface) => {

        return queryInterface.bulkInsert('poi_contents', [
            {
                content_type_id: 1,
                poi_id: 1,
                url_l: 'gs://iwashere-mobile.appspot.com/Updated_Map2.png',
                url_m: 'gs://iwashere-mobile.appspot.com/Updated_Map2.png',
                url_s: 'gs://iwashere-mobile.appspot.com/Updated_Map2.png',
                url_xs: 'gs://iwashere-mobile.appspot.com/Updated_Map2.png'
            },
            {
                content_type_id: 1,
                poi_id: 1,
                url_l: 'gs://iwashere-mobile.appspot.com/Updated_Map2.png',
                url_m: 'gs://iwashere-mobile.appspot.com/Updated_Map2.png',
                url_s: 'gs://iwashere-mobile.appspot.com/Updated_Map2.png',
                url_xs: 'gs://iwashere-mobile.appspot.com/Updated_Map2.png'
            }
        ], {});
    }
};

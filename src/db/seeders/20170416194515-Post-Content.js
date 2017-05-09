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
                url_l: 'gs://iwashere-mobile.appspot.com/HnOTfIIX4LbhzZNwKW9fwXOqJvc2/0164604285b520a3302292c498ef7cb10a3a8f879d43ca90b1ea36c892ce8f8f - 170678 - large_7b56473e43bbb9dc9e7edc7fe1cb6e88.jpeg',
                url_m: 'gs://iwashere-mobile.appspot.com/HnOTfIIX4LbhzZNwKW9fwXOqJvc2/0263bcb896493b7319d0a8ef80038251b145e30bd11027d33261900a339f437b - 282727 - medium_2e1e0a87e2e5bf4e37ce3bb4959eb3c5.jpeg',
                url_s: 'gs://iwashere-mobile.appspot.com/HnOTfIIX4LbhzZNwKW9fwXOqJvc2/0a1dce237beaede1423ccf746a13376ef8b782cfd29210914e29cc747fdac406 - 170678 - small_2c93d42b36e8ee76a39e6c7c62bf3736.jpeg',
                url_xs: 'gs://iwashere-mobile.appspot.com/HnOTfIIX4LbhzZNwKW9fwXOqJvc2/11f3d5689593af6de4844f08a710db66f7b1e7ee8342ff41005aaae009debc61 - 282727 - xsmall_50b7f55b7f52e18be8bf2d9b724534e7.jpeg'
            }
        ], {});
    }
};

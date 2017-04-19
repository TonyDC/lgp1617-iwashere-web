'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('poi_media');
    }
};

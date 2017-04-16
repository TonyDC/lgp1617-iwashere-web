'use strict';
module.exports = function(sequelize, DataTypes) {
    var poi_media = sequelize.define('poi_media', {
        mediaId: DataTypes.INTEGER,
        poiId: DataTypes.INTEGER
    }, {
        classMethods: {
            associate: (models) => {
            }
        }
    });
    return poi_media;
};

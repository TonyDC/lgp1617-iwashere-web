'use strict';

module.exports = function(sequelize, DataTypes) {
    var media = sequelize.define('media', {
        url: DataTypes.STRING,
        type: DataTypes.ENUM('TXT', 'IMG', 'VID')
    }, {
        classMethods: {
            associate: (models) => {
                media.belongsToMany(models.poi, { as: 'media', through: 'poi_media' });
            }
        }
    });
    return media;
};

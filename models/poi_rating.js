'use strict';

module.exports = function(sequelize, DataTypes) {
  var poi_rating = sequelize.define('poi_rating', {
    rating: DataTypes.INTEGER,
    userId: DataTypes.STRING
  }, {
    classMethods: {
      associate: (models) => {
          poi_rating.belongsTo(models.poi);
      }
    }
  });
  return poi_rating;
};

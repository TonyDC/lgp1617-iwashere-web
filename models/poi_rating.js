'use strict';

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('poi', {
        address: DataTypes.STRING,
        description: DataTypes.STRING,
        latitude: DataTypes.REAL,
        longitude: DataTypes.REAL,
        name: DataTypes.STRING
    }, {
        classMethods: {
            associate: function(models) {
                // associations can be defined here
            }
        }
    });
};

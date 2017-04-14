'use strict';

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('poi', {
        name: DataTypes.STRING,
        description: DataTypes.STRING,
        latitude: DataTypes.NUMBER,
        longitude: DataTypes.NUMBER,
        address: DataTypes.STRING
    }, {
        classMethods: {
            associate: function(models) {
                // associations can be defined here
            }
        }
    });
};

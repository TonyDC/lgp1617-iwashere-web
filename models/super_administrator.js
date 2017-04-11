'use strict';

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Super_Administrator', {
        uid: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }
    }, {
        classMethods: {
            associate: function(models) {
                // associations can be defined here
            }
        }
    });
};
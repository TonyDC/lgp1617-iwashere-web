'use strict';

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('super_administrator', {
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

'use strict';

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('User', {
        uid: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }
    }, {
        classMethods: {
            associate: (models) => {
                // associations can be defined here
            }
        }
    });
};

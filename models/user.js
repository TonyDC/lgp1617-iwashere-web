'use strict';

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('user', {
        uid: {
            allowNull: false,
            type: DataTypes.STRING,
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

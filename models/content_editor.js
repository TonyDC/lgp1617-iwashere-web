'use strict';

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('content_editor', {
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

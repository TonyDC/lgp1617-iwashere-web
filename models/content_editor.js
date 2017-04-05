'use strict';

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Content_Editor', {
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

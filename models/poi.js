'use strict';

module.exports = (sequelize, DataTypes) => {
    const POI = sequelize.define('POI', {
        description: {
            allowNull: false,
            type: DataTypes.TEXT
        },
        latitude: {
            allowNull: false,
            type: DataTypes.FLOAT,
            validate: {
                max: 90,
                min: -90
            }
        },
        longitude: {
            allowNull: false,
            type: DataTypes.INTEGER,
            validate: {
                max: 180,
                min: -180
            }
        },
        name: {
            allowNull: false,
            type: DataTypes.STRING,
            unique: true
        },
        rating: {
            allowNull: false,
            defaultValue: 0,
            type: DataTypes.FLOAT
        }
    }, {
        classMethods: {
            associate: (models) => {
                //POI.belongsToMany(models.Route, {through: 'POIsRoutes' });
                //POI.hasMany(models.Tag);
                POI.hasMany(models.Media);
            }
        }
    });

    return POI;
};

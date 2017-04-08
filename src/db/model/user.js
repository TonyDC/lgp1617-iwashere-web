'use strict';

const Sequelize = require('sequelize');
const sequelize = require('../index');

module.exports.ContentEditor = sequelize.define('Content_Editor', {
    email: {
        allowNull: false,
        type: Sequelize.STRING
    },
    firstName: {
        allowNull: false,
        type: Sequelize.STRING
    },
    lastName: {
        allowNull: false,
        type: Sequelize.STRING
    },
    password: {
        allowNull: false,
        type: Sequelize.STRING
    },
    username: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true
    }
});

module.exports.Administrator = sequelize.define('Administrator', {
    email: {
        allowNull: false,
        type: Sequelize.STRING
    },
    firstName: {
        allowNull: false,
        type: Sequelize.STRING
    },
    lastName: {
        allowNull: false,
        type: Sequelize.STRING
    },
    password: {
        allowNull: false,
        type: Sequelize.STRING
    },
    username: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true
    }
});

module.exports.SuperAdmin = sequelize.define('Super_Admin', {
    email: {
        allowNull: false,
        type: Sequelize.STRING
    },
    firstName: {
        allowNull: false,
        type: Sequelize.STRING
    },
    lastName: {
        allowNull: false,
        type: Sequelize.STRING
    },
    password: {
        allowNull: false,
        type: Sequelize.STRING
    },
    username: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true
    }
});

module.exports.MainUser = sequelize.define('Main_User', {
    UID: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true
    },
    email: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true
    }
});

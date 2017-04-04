'use strict';

const Sequelize = require('sequelize');
const sequelize = require('../index');

module.exports.contentEditor = sequelize.define('Content_Editor', {
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

module.exports.administrator = sequelize.define('Administrator', {
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

module.exports.superAdmin = sequelize.define('Super_Admin', {
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

module.exports.mainUser = sequelize.define('Main_User', {
    address: {
        allowNull: false,
        type: Sequelize.STRING
    },
    alias: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true
    },
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

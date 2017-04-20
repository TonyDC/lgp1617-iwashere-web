"use strict";

/* eslint no-process-env: "off" */
/* eslint camelcase: "off" */
/* eslint global-require: "off" */
/* eslint no-console: "off" */
/* eslint no-unused-vars: "off" */

const mainConfig = require('./config');

/* *********************************** */

// Prepare web and REST API server
const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const httpCodes = require('http-status-codes');
const firebaseAdmin = require("firebase-admin");
const winston = require('winston');
const expressWinston = require('express-winston');

const APIMiddleware = require('./src/api/index');

const app = express();

const indexPath = path.join(__dirname, 'public/index.html');
const publicPath = express.static(path.join(__dirname, 'public'));

if (process.env.NODE_ENV !== 'production') {
    const webpack = require('webpack');
    const webpackDevMiddleware = require('webpack-dev-middleware');
    const webpackHotMiddleware = require('webpack-hot-middleware');
    const config = require('./webpack.dev.config.js');
    const compiler = webpack(config);

    app.use(webpackHotMiddleware(compiler));
    app.use(webpackDevMiddleware(compiler, {
        noInfo: false,
        publicPath: config.output.publicPath
    }));

    /* eslint no-console: "off" */
    console.log('development mode activated');
}

// Logger
app.use(expressWinston.logger({
    transports: [
        new winston.transports.Console({
            colorize: true,
            json: true
        })
    ]
}));

// GZip compression
app.use(require('compression')());

// HTTP security headers
app.use(require('helmet')());

// JSON body parser
app.use(bodyParser.json());

// URL-encoded body parser
app.use(bodyParser.urlencoded({ extended: true }));

// Firebase Admin SDK Initialization
const serviceAccountKey = require(mainConfig.FIREBASE_ADMIN_SDK_PATH);
firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAccountKey),
    databaseURL: mainConfig.FIREBASE_CONFIG.databaseURL
});

/* *********************************** */

// Public files entrypoint
app.use('/public', publicPath);

// API entrypoins
app.use('/api', APIMiddleware);

// URL not found: server index.html
app.use((_, res) => {
    res.sendFile(indexPath);
});

app.use(expressWinston.errorLogger({
    transports: [
        new winston.transports.Console({
            colorize: true,
            json: true
        })
    ]
}));

// Error middleware handler
app.use((err, req, res, next) => {
    res.status(httpCodes.INTERNAL_SERVER_ERROR).send({ message: 'Something went wrong!' });
});

/* *********************************** */

module.exports = app;

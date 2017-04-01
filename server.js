/* eslint no-process-env: "off" */
/* eslint camelcase: "off" */
/* eslint global-require: "off" */
/* eslint no-console: "off" */

// Synchronize database
const db = require('./src/db/model');
db.sync();

/* *********************************** */

// Prepare web and REST API server
const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const firebase = require('firebase');

const apiMiddleware = require('./src/api/index');

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

app.use(require('compression')());
app.use(require('helmet')());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Initialize Firebase
const firebaseConfig = require("./config/firebase-config.json");
firebase.initializeApp(firebaseConfig);

app.use('/public', publicPath);
app.use('/api', apiMiddleware);
app.use((_, res) => {
    res.sendFile(indexPath);
});

/* *********************************** */

module.exports = app;

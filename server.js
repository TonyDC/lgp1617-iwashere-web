const PORT = (process.env.PORT || 8080);

const path = require('path');
const express = require('express');
const firebase = require('firebase');

const apiMiddleware = require('./src/api/main');

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

    console.log('development mode activated');
} 

app.use(require('compression')());

// Initialize Firebase
var firebaseConfig = require("./config/firebase-config.json");
firebase.initializeApp(firebaseConfig);

app.use('/public', publicPath);
app.use('/api', apiMiddleware);
app.get('/', (_, res) => { res.sendFile(indexPath) });

app.use((_, res) => { res.sendFile(indexPath)} );

app.listen(PORT);
console.log(`Listening at port ${PORT}`);
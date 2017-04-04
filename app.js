/* eslint no-process-env: "off" */
/* eslint camelcase: "off" */
/* eslint global-require: "off" */
/* eslint no-console: "off" */

const path = require('path');

global.root_require = (dir) => {
    return require(path.join(__dirname, dir));
};

const DEFAULT_PORT = 8080,
    PORT = process.env.PORT || DEFAULT_PORT;

const app = require('./server');
app.listen(PORT);
console.log(`Listening at port ${PORT}`);

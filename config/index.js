/* eslint no-process-env: "off", global-require: "off" */

/* According to Jest documentation:
 *
 * If you are using a more complicated Babel configuration, using Babel's env option,
 * keep in mind that Jest will automatically define NODE_ENV as test.
 *
 * It will not use development section like Babel does by default when no NODE_ENV is set.
 */
if (process.env.NODE_ENV === 'test') {
    module.exports = {
        FIREBASE_ADMIN_SDK_PATH: ' ',
        FIREBASE_CONFIG: {
            apiKey: " ",
            authDomain: " ",
            databaseURL: " ",
            messagingSenderId: " ",
            projectId: " ",
            storageBucket: " "
        },
        POSTGRESQL_CONFIG: {
            DATABASE: ' ',
            PASSWORD: ' ',
            CONN_CONFIG: {
                dialect: ' ',
                host: ' ',
                pool: {
                    idle: 0,
                    max: 0,
                    min: 0
                },
            },
            USERNAME: ' '
        },
        GOOGLE_MAPS_API_KEY: ' '
    };
} else {
    let importedModule = null;
    if (process.env.NODE_ENV === 'production') {
        importedModule = require('./config.js');
    } else {
        importedModule = require('./my-config.js');
    }
    module.exports = importedModule;
}

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
            USERNAME: ' ',
            PASSWORD: ' ',
            CONN_CONFIG: {
                host: ' ',
                dialect: ' ',
                pool: {
                    max: 0,
                    min: 0,
                    idle: 0
                },
            }
        },
        GOOGLE_MAPS_API_KEY: ' '
    };
} else {
    let importedModule = require('./my-config.js');
    if (process.env.NODE_ENV === 'production') {
        importedModule = require('./config.js');
    }
    module.exports = importedModule;
}

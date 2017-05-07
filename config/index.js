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
            DATABASE: 'lgp',
            PASSWORD: '123',
            CONN_CONFIG: {
                dialect: 'postgres',
                host: '127.0.0.1',
                pool: {
                    idle: 0,
                    max: 0,
                    min: 0
                },
            },
            USERNAME: 'luiscosta'
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

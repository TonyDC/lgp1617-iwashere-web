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
                host: '127.0.0.1',
                dialect: 'postgres',
                pool: {
                    max: 0,
                    min: 0,
                    idle: 0
                },
            },
            USERNAME: 'luiscosta'
        },
        GOOGLE_MAPS_API_KEY: ' '
    };
} else {
    module.exports = process.env.NODE_ENV === 'production' ? require('./config') : require('./my-config');
}

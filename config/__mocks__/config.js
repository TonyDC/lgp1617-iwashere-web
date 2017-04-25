module.exports = {
        FIREBASE_ADMIN_SDK_PATH: './config/iwashere-mobile-firebase-adminsdk-fuch3-2a1e5fef6f.json',
        FIREBASE_CONFIG: {
            apiKey: "AIzaSyBBFDyYUUxcpXJLyqX0lzIi7EvMJ8Ygy3A",
            authDomain: "iwashere-mobile.firebaseapp.com",
            databaseURL: "https://iwashere-mobile.firebaseio.com",
            messagingSenderId: "870991185151",
            projectId: "iwashere-mobile",
            storageBucket: "iwashere-mobile.appspot.com"
        },
        POSTGRESQL_CONFIG: {
            DATABASE: 'lgp',
            USERNAME: 'postgres',
            PASSWORD: '',
            CONN_CONFIG: {
                host: 'localhost',
                dialect: 'postgres',
                pool: {
                    max: 10,
                    min: 0,
                    idle: 10000
                },
            }
        },
        GOOGLE_MAPS_API_KEY: 'AIzaSyDifdID6peJ__zQ6cKA1KxPm0hSuevf6-w'
};

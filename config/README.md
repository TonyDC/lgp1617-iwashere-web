# Configuration File

### Development mode

#### `my-config.js`

In development mode, a `my-config.js` file is required, containing the following properties:

- `FIREBASE_ADMIN_SDK_PATH`: path to Firebase Admin SDK configuration `.json` file - More information on how to get this file [here](https://firebase.google.com/docs/admin/setup)
- `FIREBASE_CONFIG`: object containing all the required information for Firebase - More information on how to get this information [here](https://firebase.google.com/docs/auth/web/custom-auth)
- `POSTGRESQL_CONN_STRING`: the connection string to PostgreSQL database (example: `postgres://user:password@location:5432/database` )

__Example of my-config.js__
```
module.exports = {
    FIREBASE_ADMIN_SDK_PATH: 'config/iwashere-mobile-firebase-adminsdk-random_random.json',
    FIREBASE_CONFIG:
    {
        apiKey: "random_key",
        authDomain: "iwashere-mobile.firebaseapp.com",
        databaseURL: "https://iwashere-mobile.firebaseio.com",
        messagingSenderId: "random_number",
        storageBucket: "iwashere-mobile.appspot.com"
    },
    POSTGRESQL_CONN_STRING: 'postgres://user:password@location:5432/database'
};
```

#### `db-config.js`

This is a file representing the required configurations for database migration.

__Example of db-config.js__
```
{
  "development": {
    "username": "postgres",
    "password": null,
    "database": "lgp",
    "host": "127.0.0.1",
    "dialect": "postgresql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}

```

### Production mode

Same as above, except the filename, which is `config.js`.

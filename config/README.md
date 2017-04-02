# Configuration File

### Development mode

In development mode, a `my-config.js` file is required, containing the following properties:

- `FIREBASE_ADMIN_SDK_PATH`: path to Firebase Admin SDK configuration `.json` file
- `FIREBASE_CONFIG`: object containing all the required information for Firebase
- `POSTGRESQL_CONN_STRING`: the connection string to PostgreSQL database (example: `postgres://user:password@location:5432/database` )

### Production mode

Same as above, except the filename, which is `config.js`.

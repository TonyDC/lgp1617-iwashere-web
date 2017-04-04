module.exports = process.env.NODE_ENV === 'production'? require('./config/db-config') : require('./config/my-config');

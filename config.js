module.exports = process.env.NODE_ENV === 'production'? require('./config/config') : require('./config/my-config');

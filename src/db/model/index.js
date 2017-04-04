const sequelize = require('../index');

/* Other exports
module.exports.poi = require('./poi');
module.exports.post = require('./post');
module.exports.report = require('./report');
module.exports.route = require('./route');
module.exports.session = require('./session');
module.exports.tag = require('./tag');
*/
module.exports.user = require('./user');

module.exports.sync = () => {
    sequelize.sync();
};

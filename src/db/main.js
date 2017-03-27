const Sequelize = require('sequelize');
const sequelize = new Sequelize('postgres://postgres@localhost:5432/lgp');

let User = sequelize.define('user', {
  firstName: {
    type: Sequelize.STRING
  },
  lastName: {
    type: Sequelize.STRING
  }
});

sequelize.sync().then(() => {
  // Table created
  return User.create({
    firstName: 'John',
    lastName: 'Hancock'
  });
});

module.exports = sequelize;

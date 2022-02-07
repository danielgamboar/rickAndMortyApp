'use strict';
const bcrypt = require('bcryptjs');
// let password = hashPass(123456);
const hashPass = (password) => {
  return new Promise(async (rs) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return rs(hashedPassword);
  });
};

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let password = await hashPass('haufeteam');
    return queryInterface.bulkInsert('Users', [
      {
        fullName: 'Haufe Team',
        email: 'haufe@test.com',
        password,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {},
};

'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        fullName: 'Peter Smith',
        email: 'peter@ram.com',
        password: 'xxxxx',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        fullName: 'Maria Smith',
        email: 'maria@ram.com',
        password: 'xxxxx',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {},
};

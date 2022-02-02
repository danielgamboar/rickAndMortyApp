'use strict';
module.exports = (sequelize, DataTypes) => {
  const users_fav_chars = sequelize.define('users_fav_chars', {
    charId: { type: DataTypes.INTEGER, primaryKey: true },
  });
  users_fav_chars.associate = function (models) {
    users_fav_chars.belongsTo(models.Users, {
      foreignKey: 'userId',
    });
  };
  return users_fav_chars;
};

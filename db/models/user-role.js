'use strict';
module.exports = (sequelize, DataTypes) => {
  const userRole = sequelize.define('user-role', {
    id: {
      type: DataTypes.STRING(36),
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: DataTypes.STRING(36),
    role: DataTypes.STRING,
  }, {});
  userRole.associate = (models) => {};
  return userRole;
};
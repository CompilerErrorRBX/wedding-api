'use strict';
module.exports = (sequelize, DataTypes) => {
  const role = sequelize.define('role', {
    id: {
      type: DataTypes.STRING(36),
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: DataTypes.STRING
  }, {});
  role.associate = (models) => {
    role.belongsToMany(models.user, { through: 'user-role', as: 'users', foreignKey: 'role', targetKey: 'role' });
  };
  return role;
};
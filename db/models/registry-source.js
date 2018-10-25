'use strict';
module.exports = (sequelize, DataTypes) => {
  const registrySource = sequelize.define('registrySource', {
    id: {
      type: DataTypes.STRING(36),
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: DataTypes.STRING,
    store: DataTypes.STRING,
    url: DataTypes.STRING,
  }, {});
  registrySource.associate = (models) => {
    registrySource.hasMany(models['registryItem'], {
      as: 'items',
      foreignKey: 'registrySourceId',
      targetKey: 'id'
    });
  };
  return registrySource;
};
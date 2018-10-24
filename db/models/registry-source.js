'use strict';
module.exports = (sequelize, DataTypes) => {
  const registrySource = sequelize.define('registry-source', {
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
    registrySource.belongsTo(models.event, { as: 'event', foreignKey: 'eventId' });
    registrySource.hasMany(models['registry-item'], { as: 'items', foreignKey: 'registrySourceId', targetKey: 'id' });
  };
  return registrySource;
};
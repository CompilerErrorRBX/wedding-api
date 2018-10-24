'use strict';
module.exports = (sequelize, DataTypes) => {
  const registryItem = sequelize.define('registry-item', {
    id: {
      type: DataTypes.STRING(36),
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    url: DataTypes.STRING,
    thumbnail: DataTypes.STRING,
    name: DataTypes.STRING,
    price: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    desiredQuantity: DataTypes.INTEGER,
  }, {});
  registryItem.associate = (models) => {
    registryItem.belongsTo(models['registry-source'], { as: 'source', foreignKey: 'registrySourceId' });
  };
  return registryItem;
};
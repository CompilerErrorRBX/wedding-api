'use strict';
module.exports = (sequelize, DataTypes) => {
  var address = sequelize.define('address', {
    id: {
      type: DataTypes.STRING(36),
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    addressLine1: DataTypes.STRING,
    addressLine2: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    zip: DataTypes.STRING,
    country: DataTypes.STRING,
  }, {});
  address.associate = function(models) {
    // associations can be defined here
  };
  return address;
};
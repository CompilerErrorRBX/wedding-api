'use strict';
module.exports = (sequelize, DataTypes) => {
  var rsvp = sequelize.define('rsvp', {
    id: {
      type: DataTypes.STRING(36),
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    confirmed: DataTypes.BOOLEAN,
    fullName: DataTypes.STRING(128),
    groupId: DataTypes.STRING(36),
  }, {});
  rsvp.associate = function(models) {
    // associations can be defined here
  };
  return rsvp;
};
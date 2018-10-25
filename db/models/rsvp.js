'use strict';
module.exports = (sequelize, DataTypes) => {
  var rsvp = sequelize.define('rsvp', {
    fullName: {
      type: DataTypes.STRING(128),
    },
    confirmed: {
      type: DataTypes.BOOLEAN,
    },
    groupId: {
      type: DataTypes.UUID,
    }
  }, {});
  rsvp.associate = function(models) {
    // associations can be defined here
  };
  return rsvp;
};
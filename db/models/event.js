'use strict';
module.exports = (sequelize, DataTypes) => {
  const event = sequelize.define('event', {
    id: {
      type: DataTypes.STRING(36),
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    thumbnail: DataTypes.STRING,
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    rsvpBy: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  }, {});
  event.associate = (models) => {
    event.belongsToMany(models.user, { through: 'rsvp', as: 'attendees', foreignKey: 'eventId', targetKey: 'id' });
    event.belongsTo(models.address, { as: 'address', foreignKey: 'addressId' });
    event.hasMany(models['registry-source'], { as: 'registries', foreignKey: 'eventId' });
  };
  return event;
};
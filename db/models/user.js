'use strict';
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    id: {
      type: DataTypes.STRING(36),
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [8, 128],
          msg: 'Passwords must be between 8 and 64 characters long.',
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: {
          msg: 'Invalid email format.',
        },
        len: {
          args: [3, 254],
          msg: 'Emails must be between 3 and 254 characters long.',
        },
      },
    },
    firstName: DataTypes.STRING,
    middleName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    phone: DataTypes.STRING,
  }, {
    paranoid: true,
  });
  user.associate = (models) => {
    user.belongsToMany(models.role, { through: 'user-role', as: 'roles', foreignKey: 'userId', targetKey: 'id' });
    user.belongsToMany(models.event, { through: 'rsvp', as: 'events', foreignKey: 'userId', targetKey: 'id' });
    user.belongsTo(models.address, { as: 'address', foreignKey: 'addressId' });
  };
  return user;
};
'use strict';
module.exports = (sequelize, DataTypes) => {
  const Responder = sequelize.define('Responder', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    role: DataTypes.ENUM('Admin', 'Responder')
  }, {});
  Responder.associate = function (models) {
    // associations can be defined here
    Responder.hasMany(models.Response, {
      foreignKey: 'responderId'
    });
    Responder.belongsTo(models.Organization, {
      foreignKey: 'organizationId'
    });
  };
  return Responder;
};

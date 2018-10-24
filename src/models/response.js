'use strict';
module.exports = (sequelize, DataTypes) => {
  const Response = sequelize.define('Response', {
    body: DataTypes.STRING
  }, {});
  Response.associate = function (models) {
    // associations can be defined here
    Response.belongsTo(models.Conversation, {
      foreignKey: 'conversationId'
    });
    Response.belongsTo(models.Responder, {
      foreignKey: 'responderId'
    });
  };
  return Response;
};

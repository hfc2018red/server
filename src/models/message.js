'use strict';
module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    body: DataTypes.STRING
  }, {});
  Message.associate = function (models) {
    // associations can be defined here
    Message.belongsTo(models.Conversation, {
      foreignKey: 'conversationId'
    });
  };
  return Message;
};

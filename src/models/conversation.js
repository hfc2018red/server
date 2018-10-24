'use strict';
module.exports = (sequelize, DataTypes) => {
  const Conversation = sequelize.define('Conversation', {
    public: DataTypes.BOOLEAN
  }, {});
  Conversation.associate = function (models) {
    // associations can be defined here
    Conversation.hasMany(models.Message, {
      foreignKey: 'conversationId'
    });
    Conversation.hasMany(models.Response, {
      foreignKey: 'conversationId'
    });
  };
  return Conversation;
};

'use strict';

const models = require('../models');
const jsf = require('json-schema-faker');
const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);

const fileName = `${__dirname}/../faker-schemas/message.json`

module.exports = {
  up: (queryInterface, Sequelize) => {
    return readFile(fileName, 'utf-8').then(str => {
      const schema = JSON.parse(str);
      return Promise.all([
        Promise.all([...Array(50)].map(() => {
          return jsf.resolve(schema);
        })),
        models.Conversation.findAll()
      ]);
    }).then(([messages, conversations]) => {
      const ids = conversations.map(c => c.id);
      return queryInterface.bulkInsert(
        'Messages',
        messages.map(m => Object.assign(m, {
          conversationId: ids[Math.floor(Math.random() * ids.length)]
        }))
      );
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Messages', null, {});
  }
};

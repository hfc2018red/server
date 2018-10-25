'use strict';

const models = require('../models');
const jsf = require('json-schema-faker');
const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);

const fileName = `${__dirname}/../faker-schemas/response.json`

module.exports = {
  up: (queryInterface, Sequelize) => {
    return readFile(fileName, 'utf-8').then(str => {
      const schema = JSON.parse(str);
      return Promise.all([
        Promise.all([...Array(50)].map(() => {
          return jsf.resolve(schema);
        })),
        models.Conversation.findAll(),
        models.Responder.findAll()
      ]);
    }).then(([responses, conversations, responders]) => {
      const cids = conversations.map(c => c.id);
      const rids = responders.map(r => r.id);
      return queryInterface.bulkInsert(
        'Responses',
        responses.map(r => Object.assign(r, {
          conversationId: cids[Math.floor(Math.random() * cids.length)],
          responderId: rids[Math.floor(Math.random() * rids.length)]
        }))
      );
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Responses', null, {});
  }
};

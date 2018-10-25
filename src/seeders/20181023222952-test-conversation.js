'use strict';

const jsf = require('json-schema-faker');
const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);

const fileName = `${__dirname}/../faker-schemas/conversation.json`

module.exports = {
  up: (queryInterface, Sequelize) => {
    return readFile(fileName, 'utf-8').then(str => {
      const schema = JSON.parse(str);
      return Promise.all(
        [...Array(10)].map(() => jsf.resolve(schema))
      );
    }).then(conversations => {
      return queryInterface.bulkInsert('Conversations', conversations, {});
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Conversations', null, {});
  }
};

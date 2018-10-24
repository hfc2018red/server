'use strict';

const models = require('../models');
const jsf = require('json-schema-faker');
const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);

const fileName = `${__dirname}/../schemas/responder.json`

module.exports = {
  up: (queryInterface, Sequelize) => {
    return readFile(fileName, 'utf-8').then(str => {
      const schema = JSON.parse(str);
      return Promise.all([
        Promise.all([...Array(25)].map(() => {
          return jsf.resolve(schema)
        })),
        models.Organization.findAll()
      ]);
    }).then(([responders, organizations]) => {
      const ids = organizations.map(o => o.id);
      return queryInterface.bulkInsert(
        'Responders',
        responders.map(m => Object.assign(m, {
          organizationId: ids[Math.floor(Math.random() * ids.length)]
        }))
      );
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Responders', null, {});
  }
};

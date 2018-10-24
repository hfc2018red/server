'use strict';

const jsf = require('json-schema-faker');
const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);

const fileName = `${__dirname}/../schemas/organization.json`

module.exports = {
  up: (queryInterface, Sequelize) => {
    return readFile(fileName, 'utf-8').then(str => {
      const schema = JSON.parse(str);
      return Promise.all(
        [...Array(10)].map(() => jsf.resolve(schema))
      );
    }).then(organizations => {
      return queryInterface.bulkInsert('Organizations', organizations, {});
    }).catch(err => {
      console.log(err);
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Organizations', null, {});
  }
};

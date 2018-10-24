const express = require('express');
const app = express();
const server = require('http').Server(app);

const port = process.env.PORT || 3000;

app.use(express.json());

server.listen(port, () => {
  console.log('Server connected');

  const models = require('./src/models');
  require('./src/routes')(app, models);
});

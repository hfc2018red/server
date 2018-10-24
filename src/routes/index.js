module.exports = (app, models) => {
  return {
    organizations: require('./organizations')(app, models),
    people: require('./messages')(app, models),
    person_messages: require('./organizations')(app, models),
    responders: require('./responders')(app, models),
    responder_messages: require('./responses')(app, models)
  };
};

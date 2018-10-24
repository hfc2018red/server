'use strict';

module.exports = (app, models) => {
  app.post('/api/v1/conversations', async (req, res) => {
    const conversation = await models.Conversation.create(
      Object.assign({}, req.body)
    );

    res.json(conversation.toJSON());
  });

  app.get('/api/v1/conversations', async (req, res) => {
    const conversations = await models.Conversation.findAll();

    res.json(conversations.map(c => c.toJSON()));
  });

  app.get('/api/v1/conversations/:id', async (req, res) => {
    const conversation = await models.Conversation.findById(
      req.params.id
    );

    res.json(conversation.toJSON());
  });

  app.put('/api/v1/conversations/:id', async (req, res) => {
    await models.Conversation.update(
      req.body,
      { where: req.params }
    );

    res.json();
  });

  app.delete('/api/v1/conversations/:id', async (req, res) => {
    const conversation = await models.Conversation.findById(
      req.params.id
    );

    await conversation.destroy();

    res.json();
  });
};

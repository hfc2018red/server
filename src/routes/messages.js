'use strict';

module.exports = (app, models) => {
  app.post('/api/v1/messages', async (req, res) => {
    const message = await models.Message.create(
      req.body
    );

    res.json(message.toJSON());
  });

  app.get('/api/v1/messages', async (req, res) => {
    const messages = await models.Message.findAll();

    res.json(messages.map(m => m.toJSON()));
  });

  app.get('/api/v1/messages/:id', async (req, res) => {
    const messages = await models.Message.findById(req.params.id);

    res.json(messages.toJSON());
  });

  app.put('/api/v1/messages/:id', async (req, res) => {
    await models.Message.update(
      req.body,
      { where: req.params }
    );

    res.json();
  });

  app.delete('/api/v1/messages/:id', async (req, res) => {
    const message = await models.Message.findById(
      req.params.id
    );

    await message.destroy();

    res.json();
  });
};

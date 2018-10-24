'use strict';

module.exports = (app, models) => {
  app.post('/api/v1/responders', async (req, res) => {
    const responder = await models.Responder.create(
      req.body
    );

    res.json(responder.toJSON());
  });

  app.get('/api/v1/responders', async (req, res) => {
    const responders = await models.Responder.findAll();

    res.json(responders.map(r => r.toJSON()));
  });

  app.get('/api/v1/responders/:id', async (req, res) => {
    const responder = models.Responder.findById(req.param.id);

    res.json(responder.toJSON());
  });

  app.put('/api/v1/responders/:id', async (req, res) => {
    await models.Responder.update(
      req.body,
      { where: req.params }
    );

    res.json();
  });

  app.delete('/api/v1/responders/:id', async (req, res) => {
    const responder = await models.Responder.findById(
      req.params.id
    );

    await responder.destroy();

    res.json();
  });
};

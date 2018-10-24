'use strict';

module.exports = (app, models) => {
  app.post('/api/v1/responses', async (req, res) => {
    const response = await models.Response.create(
      req.body
    );

    res.json(response.toJSON());
  });

  app.get('/api/v1/responses', async (req, res) => {
    const responses = await models.Response.findAll();

    res.json(responses.map(r => r.toJSON()));
  });

  app.get('/api/v1/responses/:id', async (req, res) => {
    const response = await models.Response.findById(req.param.id);

    res.json(response.toJSON());
  });

  app.put('/api/v1/responses/:id', async (req, res) => {
    await models.Response.update(
      req.body,
      { where: req.params }
    );

    res.json();
  });

  app.delete('/api/v1/responses/:id', async (req, res) => {
    const response = await models.Response.findById(
      req.params.id
    );

    await response.destroy();

    res.json();
  });
};

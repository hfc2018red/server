'use strict';

module.exports = (app, models) => {
  app.post('/api/v1/organizations', async (req, res) => {
    const organization = await models.Organization.create(
      req.body
    );

    res.json(organization.toJSON());
  });

  app.get('/api/v1/organizations', async (req, res) => {
    const organizations = await models.Organization.findAll();

    res.json(organizations.map(o => o.toJSON()));
  });

  app.get('/api/v1/organizations/:id', async (req, res) => {
    const organization = await models.Organization.findById(req.params.id);

    res.json(organization.toJSON());
  });

  app.put('/api/v1/organizations/:id', async (req, res) => {
    await models.Organization.update(
      req.body,
      { where: req.params }
    );

    res.json();
  });

  app.delete('/api/v1/organizations/:id', async (req, res) => {
    const organization = await models.Organization.findById(
      req.params.id
    );

    await organization.destroy();

    res.json();
  });
};

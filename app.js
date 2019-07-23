const express = require('express');
const app = express();

const config = require('./config');

const path = require('path');

const glob = require('glob');

app.use(express.static(config.staticPath));

const routes = glob.sync(config.root + '/routers/*.js');
routes.forEach((router) => {
  app.use('/', require(router));
});

app.listen(config.port, () => console.log(`Listening on port ${config.port} ...`));


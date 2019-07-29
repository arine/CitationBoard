const path = require('path'),
      rootPath = path.normalize(__dirname + '/..'),
      env = process.env.NODE_ENV || 'development';

const config = {
  development: {
    env: env,
    root: rootPath,
    port: process.env.PORT || 8888,
    staticPath: 'dist/citationboard',
    updateInterval: 600000
  },

  production: {
    env: env,
    root: rootPath,
    port: 80,
    staticPath: 'dist/citationboard',
    updateInterval: 600000
  }
};

module.exports = config[env];


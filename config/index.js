const path = require('path'),
      rootPath = path.normalize(__dirname + '/..'),
      env = process.env.NODE_ENV || 'development';

const config = {
  development: {
    env: env,
    root: rootPath,
    port: process.env.PORT || 8888,
    staticPath: 'dist/citationboard',
  },

  production: {
    env: env,
    root: rootPath,
    port: 80,
    staticPath: 'dist/citationboard',
  }
};

module.exports = config[env];


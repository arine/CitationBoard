const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);

const config = require('./config');

require('./config/socket')(io);

app.use(express.static(config.staticPath));

server.listen(config.port, () => console.log(`Listening on port ${config.port} ...`));


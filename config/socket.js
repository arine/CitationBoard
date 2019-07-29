const Promise = require('bluebird');

const citation = require('../utils/citation');
const updateInterval = require('./index').updateInterval;

const MEMBERS = require('../members.json');

const getUpdates = (members) => {
  return new Promise((resolve, reject) => {
    Promise.all(members)
      .map(member => {
        return citation.getWithMember(member);
      }).map(res => {
        return res;
      }).then(res => {
        resolve(res);
      }).catch(err => { reject(err); });
  });
}

module.exports = (io) => {
  io.on('connection', socket => {
    socket.on('init', () => {
      getUpdates(MEMBERS)
        .then(updates => {
          socket.emit('updates', updates);
        });
    });
  });

  setTimeout(function getUpdatesAndBroadcast() {
    getUpdates(MEMBERS)
      .then(updates => {
        io.sockets.emit('updates', updates);
      });
    setTimeout(getUpdatesAndBroadcast, updateInterval);
  }, 0);
};


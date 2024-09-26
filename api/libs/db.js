const Datastore = require('nedb');
const path = require('path');
const env = require('./env');

const db = new Datastore({
  filename: path.join(env.dataDir, 'user-info.db'),
  autoload: true
});

module.exports = db;
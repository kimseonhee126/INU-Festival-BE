const Sequelize = require('sequelize');
const config = require('../config/config.json');

// const { username, password, database, host, dialect } = config.development;
const sequelize = new Sequelize('festival_v1', 'root', 'wktlr011226!', {
  host: '127.0.0.1',
  dialect: 'mysql',
  port: 8080,
});

const Perform = require('./perform.js')(sequelize, Sequelize.DataTypes);

const db = {};
db.Perform = Perform;

module.exports = db;
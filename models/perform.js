'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Perform extends Model {}
  
  Perform.init({
    name: DataTypes.STRING,
    date: DataTypes.STRING,
    day: DataTypes.STRING,
    time: DataTypes.STRING,
    category: DataTypes.STRING,
    detail: DataTypes.STRING,
    img: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Perform',
  });
  return Perform;
};
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Keywords extends Model {
    static associate(models) {
      // define association here
      
    }
  }
  Keywords.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    word: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Keywords',
  });
  return Keywords;
};
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OneLine extends Model {
    static associate(models) {
      // define association here
      models.OneLine.belongsTo(models.User, {foreignKey: "studentID"})
    }
  }
  OneLine.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    content: DataTypes.STRING,
    emoji: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'OneLine',
  });
  return OneLine;
};
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here
      models.User.hasMany(models.OneLine, {foreignKey: "snsId"})
    }
  }
  User.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    nick: {
      type: DataTypes.STRING(15),
      allowNull: true,
    },
    snsId: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
    provider: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    rank: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 1,
    },
    token: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
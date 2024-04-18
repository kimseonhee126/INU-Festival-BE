'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    // static associate(models) {
    //   // define association here
    //   models.User.hasMany(models.OneLine, {foreignKey: "studentId"})
    // }
  }
  User.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    token: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    tokenExpireTime: {
      type: DataTypes.STRING(15),
    },
    rank: {
      type: DataTypes.INTEGER,  
    },
    nick: {
      type: DataTypes.STRING(15),
    },
    // snsId: {
    //   type: DataTypes.STRING(30),
    // },
    provider: {
      type: DataTypes.STRING(10),
      defaultValue: 'LMS',
    },
    studentId: {
      type: DataTypes.STRING(20),
    },
    barcode: {
      type: DataTypes.INTEGER,  
    },
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.User.hasMany(models.OneLine, {foreignKey: "studentID"})
    }
  }
  User.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    studentID: {
      type: DataTypes.INTEGER,
    },
    // nick, provider, snsId 다 allowNull: true 조건이 있어야 하는데 이거 카카오로 로그인해서...학번이랑 동시에 저장하는 방법이...ㅠㅠ
    nick: {
      type: DataTypes.STRING(15),
      allowNull: false,
    },
    provider: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    snsId: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
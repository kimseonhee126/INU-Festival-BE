'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OneLine extends Model {
    static associate(models) {
      // define association here
      models.OneLine.belongsTo(models.User, {foreignKey: "userId"})
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
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
          model: 'User', // User 모델을 참조
          key: 'id',     // User 모델의 id 필드를 외래 키로 설정
      },
    },
  }, {
    sequelize,
    modelName: 'OneLine',
  });
  return OneLine;
};
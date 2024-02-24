'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Comment.belongsTo(models.User);
      models.User.hasMany(Comment);
      Comment.belongsTo(models.Booth);
      models.Booth.hasMany(Comment);
    }
  }
  Comment.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    content: DataTypes.STRING,
    emoji: DataTypes.STRING,
    boothId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
          model: 'Booth', // Booth 모델을 참조
          key: 'id',     // Booth 모델의 id 필드를 외래 키로 설정
      },
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
          model: 'User', // User 모델을 참조
          key: 'id',     // User 모델의 id 필드를 외래 키로 설정
      },
    },
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};
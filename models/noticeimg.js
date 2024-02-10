'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class NoticeImg extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      NoticeImg.belongsTo(models.Notice);
      models.Notice.hasMany(NoticeImg);
    }
  }
  NoticeImg.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    img: DataTypes.STRING,
    noticeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
          model: 'Notice', // Notice 모델을 참조
          key: 'id',     // Booth 모델의 id 필드를 외래 키로 설정
      },
    },
  }, {
    sequelize,
    modelName: 'NoticeImg',
  });
  return NoticeImg;
};
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BoothDay extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      BoothDay.belongsTo(models.Booth);
      models.Booth.hasMany(BoothDay);
    }
  }
  BoothDay.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    day: DataTypes.STRING,
    time: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'BoothDay',
  });

  return BoothDay;
};
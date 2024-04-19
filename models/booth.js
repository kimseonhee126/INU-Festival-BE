'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booth extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Booth.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    name: DataTypes.STRING,
    category: DataTypes.STRING,
    department: DataTypes.STRING,
    description: DataTypes.STRING,
    time: DataTypes.STRING,
    location: DataTypes.STRING,
    x: DataTypes.STRING,
    y: DataTypes.STRING,
    liked: DataTypes.INTEGER,
    markerImage: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Booth',
  });
  return Booth;
};
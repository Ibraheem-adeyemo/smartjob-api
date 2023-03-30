'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class kyc extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  kyc.init({
    NINNumber: DataTypes.STRING,
    votersCard: DataTypes.STRING,
    utilityBill: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'kyc',
  });
  return kyc;
};
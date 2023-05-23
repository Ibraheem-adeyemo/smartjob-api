'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Payment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Payment.belongsTo(models.User)
      Payment.belongsTo(models.Service)
    }
  }
  Payment.init({
    reference: DataTypes.STRING,
    amountPaid: DataTypes.FLOAT,
    paidBy: DataTypes.STRING,
    paidFor:DataTypes.INTEGER,
    paidTo:DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Payment',
  });
  return Payment;
};
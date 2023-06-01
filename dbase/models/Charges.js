'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Charges extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Charges.belongsTo(models.Service)
      Charges.belongsTo(models.User)
    }
  }
  Charges.init({
    amount: DataTypes.STRING,
    period: DataTypes.STRING,
    UserId: DataTypes.INTEGER,
    ServiceId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Charges',
  });
  return Charges;
};
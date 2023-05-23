'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BookingHistory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      BookingHistory.belongsTo(models.Booking)
      BookingHistory.belongsTo(models.User, {
        foreignKey: 'doneBy'
      })
    }
  }
  BookingHistory.init({
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'BookingHistory',
  });
  return BookingHistory;
};
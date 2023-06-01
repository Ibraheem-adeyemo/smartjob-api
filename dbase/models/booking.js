'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Booking.belongsTo(models.User, {
        foreignKey: 'bookedBy'
      })
      Booking.belongsTo(models.User, {
        foreignKey: 'worker'
      })
      Booking.hasMany(models.BookingHistory)
      Booking.hasOne(models.Payment)
      Booking.belongsTo(models.Service)
    }
  }
  Booking.init({
    amountDeposited: DataTypes.FLOAT,
    hourDepositedFor: DataTypes.FLOAT,
    status:{
        type:DataTypes.ENUM,
        values:['started','done','settled','canceled','pending'],
        defaultValue:'pending'
    },
    // need to remove this
    // bookedBy: {
    //     type: DataTypes.INTEGER
    //   },
    //   bookedFor: {
    //     type: DataTypes.INTEGER
    //   },
  }, {
    sequelize,
    modelName: 'Booking',
  });
  return Booking;
};
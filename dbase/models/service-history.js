'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ServiceHistory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    //   ServiceHistory.hasOne(models.Service)
    }
  }
  ServiceHistory.init({
    title: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ServiceHistory',
  });
  return ServiceHistory;
};
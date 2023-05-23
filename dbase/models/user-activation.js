'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserActivation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    //   UserActivation.belongsTo(models.User);
    }
  }
  UserActivation.init({
    otp: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    expiredOn: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'UserActivation',
  });
  return UserActivation;
};
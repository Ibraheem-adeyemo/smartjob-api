'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Contract extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Contract.belongsTo(models.Job)
      Contract.belongsToMany(models.User, {through: 'contract_users'})
    }
  }
  Contract.init({
    currentPhase: {
        type:DataTypes.STRING,
        allowNull:false
    },
    amountAlreadyPaid: DataTypes.STRING,
    remainingBalance: DataTypes.STRING,
    toBeCompletedOn: {
        type:DataTypes.DATE,
        allowNull:false
    }
  }, {
    sequelize,
    modelName: 'Contract',
  });
  return Contract;
};
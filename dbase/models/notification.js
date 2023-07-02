'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Notification extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Notification.belongsTo(models.User, {
        foreignKey: 'ownerId',
        targetKey:'id',
        onDelete: 'CASCADE'
      })
    }
  }
  Notification.init({
    read: {
        type:DataTypes.BOOLEAN,
        defaultValue: false
    },
    message: {
        type:DataTypes.TEXT,
        allowNull:true
    },
    meantFor: {
        type:DataTypes.CHAR,
        allowNull:false
    },
    meantForId: {
        type: DataTypes.INTEGER,
        allowNull:false
      },
    notificationType: {
        type: DataTypes.CHAR,
        allowNull:false
    },
      from: {
        type: DataTypes.INTEGER,
        allowNull:false
      },
      ownerId: {
        type: DataTypes.INTEGER,
        allowNull:false
      },
  }, {
    sequelize,
    modelName: 'Notification',
  });
  return Notification;
};
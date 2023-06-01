'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Address extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Address.belongsTo(models.User,{
        foreignKey:'userId',
        targetKey:'id',
        onDelete: 'CASCADE'
      })  
      Address.belongsTo(models.Service, {
        foreignKey:'serviceId',
        targetKey:'id',
        onDelete: 'CASCADE'
      })
      Address.belongsTo(models.Job, {
        foreignKey:'jobId',
        targetKey:'id',
        onDelete: 'CASCADE'
      })  
    }
  }
  Address.init({
    country: {
        type:DataTypes.STRING,
        allowNull:false
    },
    state: {
        type: DataTypes.STRING,
        allowNull:false
    },
    city: {
        type: DataTypes.STRING,
        allowNull:false
    },
    subUrb: DataTypes.STRING,
    street: DataTypes.STRING,
    houseNumber: DataTypes.STRING,
    location: {
        type:DataTypes.GEOMETRY('POINT', 4326),
        allowNull:false
    },
    location_m: {
        type:DataTypes.GEOMETRY('POINT', 3857),
        allowNull:false
    },
    coordinate: {
        type:DataTypes.STRING,
        allowNull:false
    },
    // I will have to remove longitude and latitude
    longitude: {
        type:DataTypes.FLOAT,
        allowNull: false
    },
    latitude: {
        type:DataTypes.FLOAT,
        allowNull: false
    },
    userId: {
        type:DataTypes.INTEGER
    },
    serviceId: {
        type:DataTypes.INTEGER
    },
    jobId: {
        type:DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'Address',
  });
  return Address;
};
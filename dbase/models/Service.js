'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Service extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Service.belongsTo(models.User, {
        foreignKey: 'userId',
        targetKey:'id',
        onDelete: 'CASCADE'
      })
    //   Service.hasOne(models.ServiceHistory, {
    //     foreignKey: 'serviceId',
    //     targetKey: 'id'
    //   })
      Service.belongsToMany(models.Category, {
        through: 'service_categories'
      })
      Service.belongsToMany(models.Tag, {
        through: 'service_tags'
      })
      Service.hasOne(models.Address, {
        foreignKey:'serviceId',
        targetKey:'id',
        onDelete: 'CASCADE'
      }),
      Service.hasMany(models.Payment)
    //   Service.belongsTo(models.Work)
      Service.hasMany(models.Charges)
      Service.hasMany(models.ServiceType)
    }
  }
  Service.init({
    // You will have to remove the title
    // title: {
    //     allowNull: false,
    //     type: DataTypes.STRING
    //   },
      workId: {
        type: DataTypes.INTEGER
      },
      description: {
        allowNull: true,
        type: DataTypes.TEXT
      },
      location: {
        allowNull: true,
        type: DataTypes.INTEGER
      },
      expertLevel: {
        allowNull: false,
        type: DataTypes.ENUM,
        values: ['beginner', 'intermediate', 'advance', 'expert']
      },
      yearsOfExperience: {
        allowNull:false,
        type: DataTypes.INTEGER
      },
      banners: {
        allowNull: false,
        type: DataTypes.TEXT
      },
      video: {
        allowNull: true,
        type: DataTypes.STRING
      },
    //   you will remove the service type there will be a foreign on service type table references service
      serviceType: {
        type:DataTypes.INTEGER,
        // values: ['hourly', 'daily', 'weekly', 'biweekly', 'monthly', 'contract', 'fulltime']
      },
      status: {
        type:DataTypes.ENUM,
        values: ['available','notavailable']
      },
      advancePayment: {
        allowNull: false,
        type: DataTypes.FLOAT
      },
      serviceCharges: {
        type: DataTypes.INTEGER
      },
  }, {
    sequelize,
    modelName: 'Service',
  });
  return Service;
};
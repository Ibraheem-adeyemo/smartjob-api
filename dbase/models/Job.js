'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Job extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Job.belongsTo(models.User, {
        foreignKey: 'userId',
        targetKey:'id',
        onDelete: 'CASCADE'
      }),
      Job.belongsToMany(models.Category, {
        through: 'job_categories'
      })
      Job.belongsToMany(models.Tag, {
        through: 'job_tags'
      })
    //   Job.hasMany(models.PostJobReview)
      Job.hasOne(models.Address, {
        foreignKey:'jobId',
        targetKey:'id',
        onDelete: 'CASCADE'
      })
      Job.hasMany(models.Quotation)
    }
  }
  Job.init({
    title: {
        allowNull: false,
        type: DataTypes.STRING
      },
      description: {
        allowNull: false,
        type: DataTypes.TEXT
      },
      location: {
        allowNull: false,
        type: DataTypes.STRING
      },
      longitude: {
        type: DataTypes.FLOAT,
        allowNull:true
      },
      latitude: {
        type: DataTypes.FLOAT,
        allowNull:true
      },
      expertLeve: {
        allowNull: false,
        type: DataTypes.ENUM,
        values: ['any', 'beginner', 'intermediate', 'advance', 'expert']
      },
      images: {
        allowNull: false,
        type: DataTypes.TEXT
      },
      video: {
        allowNull: true,
        type: DataTypes.STRING
      },
      contractType: {
        type:DataTypes.ENUM,
        values: ['hourly', 'daily', 'weekly', 'biweekly', 'monthly', 'contract', 'fulltime']
      },
      status: {
        type:DataTypes.ENUM,
        values: ['new','engaged','completed','settled', 'expired']
      },
      numberOfWorkers: {
        type:DataTypes.INTEGER
      },
      budget: {
        type: DataTypes.INTEGER
      },
      budgetFor: {
        type: DataTypes.ENUM,
        values: ['worker', 'job']
      }
  }, {
    sequelize,
    modelName: 'Job',
  });
  return Job;
};
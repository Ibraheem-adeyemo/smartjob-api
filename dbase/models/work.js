'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class work extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  work.init({
    name: DataTypes.STRING,
    code: {
        allowNull:false,
        type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'Work',
  });
  return work;
};
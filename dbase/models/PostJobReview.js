'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Review.belongsTo(models.User)
    }
  }
  Review.init({
    experience: DataTypes.ENUM(['good','bad','satisfactory','excellent','very worst','extremely worst', 'very satisfactory']),
    unprovidedInfo: DataTypes.TEXT,
    futureEngagement: DataTypes.ENUM(['very likely', 'likely', 'not likely', 'very unlikely']),
    reccomendation: DataTypes.ENUM(['reccomended', 'notreccomended']),
    comment: {
        type: DataTypes.TEXT
      },
      ratings: {
        type: DataTypes.INTEGER
      },
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};
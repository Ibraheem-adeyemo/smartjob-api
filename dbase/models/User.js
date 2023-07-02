'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcrypt')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    static associate(models) {
      // define association here
      User.hasMany(models.Job, {
        foreignKey: 'userId',
        targetKey: 'id',
        onDelete:'CASCADE'
      })
      User.hasMany(models.Service, {
        foreignKey: 'userId',
        targetKey: 'id',
        onDelete:'CASCADE'
      })
      User.belongsToMany(models.Contract, {through: 'contract_user'})
      User.hasMany(models.Review)
      User.hasMany(models.Payment)
      User.hasOne(models.Profile)
      User.hasOne(models.Address, {
        foreignKey: 'userId',
        targetKey:'id',
        onDelete: 'CASCADE'
      })
    }

    async matchPassword (enteredPassword) {
        return await bcrypt.compare(enteredPassword, this.password);
      };
  }
  User.init({
    firstName: {
        allowNull: false,
        type: DataTypes.STRING
      },
      lastName: {
        allowNull: false,
        type: DataTypes.STRING
      },
      email: {
        type: DataTypes.STRING,
        unique: true
      },
      isVerified: {
        type: DataTypes.BOOLEAN,
        allowNull:false,
        defaultValue: false
      },
      username: {
        type: DataTypes.STRING,
        allowNull:true,
        unique: true
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING
      },
      credibility: {
        type: DataTypes.ENUM,
        values: ['banned', 'active', 'susspend'],
        defaultValue:'active'
      },
      phoneNumber: {
        allowNull: true,
        type: DataTypes.STRING
      },
      
  }, {
    hooks: {
        beforeCreate: async (user) =>{
            const encryptedPassword = await bcrypt.hash(
                user.password,
                10
              );
              user.password = encryptedPassword;
        }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Un Usuario (User) tiene muchas (hasMany) Órdenes (Order)
      User.hasMany(models.Order, {
        foreingKey: 'user_run',
        sourceKey: 'run',
        as: 'orders'
      });
    }
  }
  User.init({
    run: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    nombre: DataTypes.STRING,
    apellidos: DataTypes.STRING,
    email: DataTypes.STRING,
    fechaNacimiento: DataTypes.DATE,
    region: DataTypes.STRING,
    comuna: DataTypes.STRING,
    direccion: DataTypes.STRING,
    password: DataTypes.STRING,
    tipoUsuario: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
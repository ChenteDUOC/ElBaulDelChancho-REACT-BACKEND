'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Un Producto (Product) puede estar en muchos (hasMany) Detalles de Orden (OrderDetail)
      Product.hasMany(models.OrderDetail, {
        foreignKey: 'product_id', // La columna en 'OrderDetails'
        sourceKey: 'id'           // La columna en 'Products'
      });
    }
  }
  Product.init({
    codigo: DataTypes.STRING,
    nombre: DataTypes.STRING,
    precio: DataTypes.FLOAT,
    stock: DataTypes.INTEGER,
    categoria: DataTypes.STRING,
    descripcion: DataTypes.TEXT,
    imagen: DataTypes.STRING,
    stock_critico: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};
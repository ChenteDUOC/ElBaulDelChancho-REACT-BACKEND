'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Un Detalle (OrderDetail) pertenece a (belongsTo) una Orden (Order)
      OrderDetail.belongsTo(models.Order, {
        foreignKey: 'order_id',
        targetKey: 'id'
      });

      // Un Detalle (OrderDetail) pertenece a (belongsTo) un Producto (Product)
      OrderDetail.belongsTo(models.Product, {
        foreignKey: 'product_id',
        targetKey: 'id'
      });
    }
  }
  OrderDetail.init({
    cantidad: DataTypes.INTEGER,
    precio_unitario: DataTypes.INTEGER,
    order_id: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'OrderDetail',
  });
  return OrderDetail;
};
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Una Orden (Order) pertenece a (belongsTo) un Usuario (User)
      Order.belongsTo(models.User, {
        foreignKey: 'user_run', // La columna en 'Orders' (este modelo)
        targetKey: 'run' ,       // La columna en 'Users' a la que apunta
        as: 'user'
      });

      // Una Orden (Order) tiene muchos (hasMany) Detalles (OrderDetail)
      Order.hasMany(models.OrderDetail, {
        foreignKey: 'order_id', // La columna en 'OrderDetails'
        sourceKey: 'id'         // La columna en 'Orders' (este modelo)
      });
    }
  }
  Order.init({
    fecha: DataTypes.DATE,
    total: DataTypes.INTEGER,
    estado: DataTypes.STRING,
    UserRun: {
      type:DataTypes.STRING,
    allowNull: false,
    field: 'user_run'}
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};
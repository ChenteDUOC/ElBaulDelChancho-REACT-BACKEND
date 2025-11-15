const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// POST /api/orders  (Crear Orden)
router.post('/', orderController.createOrder);

// GET /api/orders   (Leer Todas las Órdenes)
router.get('/', orderController.getAllOrders);

// GET /api/orders/:id   (Leer Una Orden Específica)
router.get('/:id', orderController.getOrderById);

// (Podríamos añadir PUT y DELETE para cancelar órdenes, pero por ahora está bien)

module.exports = router;
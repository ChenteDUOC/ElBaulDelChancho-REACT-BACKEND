const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// POST /api/products  (Crear)
router.post('/', productController.createProduct);

// GET /api/products   (Leer Todos)
router.get('/', productController.getAllProducts);

// GET /api/products/:id   (Leer Uno)
router.get('/:id', productController.getProductById);

// PUT /api/products/:id   (Actualizar)
router.put('/:id', productController.updateProduct);

// DELETE /api/products/:id   (Eliminar)
router.delete('/:id', productController.deleteProduct);

module.exports = router;
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Mapeamos cada URL a una función del controlador

// POST /api/users  (Crear)
router.post('/', userController.createUser);

// GET /api/users   (Leer Todos)
router.get('/', userController.getAllUsers);

// GET /api/users/:run   (Leer Uno)
router.get('/:run', userController.getUserByRun);

// PUT /api/users/:run   (Actualizar)
router.put('/:run', userController.updateUser);

// DELETE /api/users/:run   (Eliminar)
router.delete('/:run', userController.deleteUser);

module.exports = router;
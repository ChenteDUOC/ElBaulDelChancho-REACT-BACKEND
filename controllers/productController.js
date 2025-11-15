// Importamos el modelo de Producto
const { Product } = require('../models');

module.exports = {

    /**
     * POST /api/products
     * Crea un nuevo producto.
     */
    createProduct: async (req, res) => {
        try {
            const newProduct = await Product.create(req.body);
            res.status(201).json({
                message: '¡Producto creado exitosamente!',
                product: newProduct
            });
        } catch (error) {
            // Error si, por ejemplo, el 'codigo' ya existe
            res.status(400).json({
                message: 'Error al crear producto',
                error: error.message
            });
        }
    },

    /**
     * GET /api/products
     * Obtiene todos los productos.
     */
    getAllProducts: async (req, res) => {
        try {
            const products = await Product.findAll();
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener productos', error: error.message });
        }
    },

    /**
     * GET /api/products/:id
     * Obtiene un producto por su ID.
     */
    getProductById: async (req, res) => {
        try {
            // OJO: Los productos usan 'id' (número), no 'run' (string)
            const id = req.params.id;
            const product = await Product.findByPk(id); // Buscar por Primary Key (id)

            if (product) {
                res.status(200).json(product);
            } else {
                res.status(404).json({ message: 'Producto no encontrado' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener producto', error: error.message });
        }
    },

    /**
     * PUT /api/products/:id
     * Actualiza un producto por su ID.
     */
    updateProduct: async (req, res) => {
        try {
            const id = req.params.id;
            const [updated] = await Product.update(req.body, {
                where: { id: id }
            });

            if (updated) {
                const updatedProduct = await Product.findByPk(id);
                res.status(200).json({ message: 'Producto actualizado', product: updatedProduct });
            } else {
                res.status(404).json({ message: 'Producto no encontrado' });
            }
        } catch (error) {
            res.status(400).json({ message: 'Error al actualizar producto', error: error.message });
        }
    },

    /**
     * DELETE /api/products/:id
     * Elimina un producto por su ID.
     */
    deleteProduct: async (req, res) => {
        try {
            const id = req.params.id;
            const deleted = await Product.destroy({
                where: { id: id }
            });

            if (deleted) {
                res.status(200).json({ message: 'Producto eliminado exitosamente' });
            } else {
                res.status(404).json({ message: 'Producto no encontrado' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error al eliminar producto', error: error.message });
        }
    }
};
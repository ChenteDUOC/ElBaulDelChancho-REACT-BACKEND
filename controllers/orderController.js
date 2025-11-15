// Importamos todos los modelos que vamos a necesitar
const { sequelize, Order, OrderDetail, User, Product } = require('../models');

module.exports = {

    /**
     * POST /api/orders
     * Crea una nueva orden de compra.
     * Espera un JSON con: { user_run, total, items: [ ... ] }
     */
    createOrder: async (req, res) => {
        // Iniciamos una transacción. Todo o nada.
        const t = await sequelize.transaction();

        try {
            const { user_run, total, items } = req.body;

            // --- Paso 1: Crear la Orden (la cabecera) ---
            // Usamos la transacción 't'
            const newOrder = await Order.create({
                UserRun: user_run,
                total: total
            }, { transaction: t });

            // --- Paso 2: Preparar los detalles de la orden ---
            // Recorremos el array 'items' que viene del carrito
            const orderDetails = items.map(item => {
                return {
                    cantidad: item.cantidad,
                    precio_unitario: item.precio_unitario, // Precio al momento de la compra
                    order_id: newOrder.id, // El ID de la orden que acabamos de crear
                    product_id: item.product_id
                }
            });

            // --- Paso 3: Guardar todos los detalles en la BD ---
            // Usamos bulkCreate para guardar el array completo de una vez
            await OrderDetail.bulkCreate(orderDetails, { transaction: t });
            
            // --- (Opcional) Paso 4: Descontar Stock ---
            // Recorremos los items y actualizamos el stock en la tabla Products
            for (const item of items) {
                await Product.increment(
                    { stock: -item.cantidad }, // Resta la cantidad
                    { where: { id: item.product_id }, transaction: t }
                );
            }

            // --- Paso 5: Si todo salió bien, confirmamos la transacción ---
            await t.commit();
            
            res.status(201).json({
                message: '¡Orden creada exitosamente!',
                order: newOrder
            });

        } catch (error) {
            // --- ¡Error! Si algo falló, revertimos todo ---
            await t.rollback();
            res.status(500).json({
                message: 'Error al crear la orden',
                error: error.message
            });
        }
    },

    /**
     * GET /api/orders
     * Obtiene todas las órdenes (para el Vendedor/Admin)
     */
    getAllOrders: async (req, res) => {
        try {
            // Usamos 'include' para traer los datos del usuario (hace un JOIN)
            const orders = await Order.findAll({
                include: [{
                    model: User,
                    as: 'user',
                    attributes: ['nombre', 'apellidos', 'email'] // Solo traemos estos datos del usuario
                }],
                order: [['fecha', 'DESC']] // Ordena por fecha, las más nuevas primero
            });
            res.status(200).json(orders);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener órdenes', error: error.message });
        }
    },

    /**
     * GET /api/orders/:id
     * Obtiene el detalle completo de UNA orden
     */
    getOrderById: async (req, res) => {
        try {
            const id = req.params.id;
            const order = await Order.findByPk(id, {
                // Hacemos un "JOIN" anidado:
                // Order -> User
                // Order -> OrderDetails -> Product
                include: [
                    {
                        model: User,
                        as: 'user',
                        attributes: ['nombre', 'apellidos', 'email']
                    },
                    {
                        model: OrderDetail,
                        include: [{
                            model: Product,
                            attributes: ['nombre', 'codigo']
                        }]
                    }
                ]
            });

            if (order) {
                res.status(200).json(order);
            } else {
                res.status(404).json({ message: 'Orden no encontrada' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener orden', error: error.message });
        }
    }
};
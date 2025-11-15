// Importamos el modelo para poder interactuar con la tabla Users
const { User } = require('../models');
const bcrypt = require('bcryptjs');

// Exportamos un objeto con todas nuestras funciones
module.exports = {

    /**
     * POST /api/users
     * Crea un nuevo usuario en la base de datos.
     */
    createUser: async (req, res) => {
    try {
        // Obtenemos la contraseña del body
        const { password } = req.body;

        // Generamos un "salt" (aleatoriedad) y encriptamos la contraseña
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Creamos el usuario PERO con la contraseña encriptada
        const newUser = await User.create({
            ...req.body, // Copia todos los datos (run, nombre, email...)
            password: hashedPassword // Reemplaza la contraseña por la encriptada
        });

        res.status(201).json({
            message: '¡Usuario creado exitosamente!',
            user: newUser // (Tranquilo, la contraseña no se devuelve aquí por defecto)
        });
    } catch (error) {
        res.status(400).json({
            message: 'Error al crear usuario',
            error: error.message
        });
    }
},

    /**
     * GET /api/users
     * Obtiene una lista de todos los usuarios.
     */
    getAllUsers: async (req, res) => {
        try {
            const users = await User.findAll(); // Busca todos los registros
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener usuarios', error: error.message });
        }
    },

    /**
     * GET /api/users/:run
     * Obtiene un usuario específico usando su RUN.
     */
    getUserByRun: async (req, res) => {
        try {
            const run = req.params.run; // Obtiene el RUN desde la URL
            const user = await User.findByPk(run); // findByPk = Buscar por Primary Key

            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({ message: 'Usuario no encontrado' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener usuario', error: error.message });
        }
    },

    /**
     * PUT /api/users/:run
     * Actualiza un usuario específico usando su RUN.
     */
    updateUser: async (req, res) => {
        try {
            const run = req.params.run;
            const [updated] = await User.update(req.body, {
                where: { run: run }
            });

            if (updated) {
                const updatedUser = await User.findByPk(run);
                res.status(200).json({ message: 'Usuario actualizado', user: updatedUser });
            } else {
                res.status(404).json({ message: 'Usuario no encontrado' });
            }
        } catch (error) {
            res.status(400).json({ message: 'Error al actualizar usuario', error: error.message });
        }
    },

    /**
     * DELETE /api/users/:run
     * Elimina un usuario específico usando su RUN.
     */
    deleteUser: async (req, res) => {
        try {
            const run = req.params.run;
            const deleted = await User.destroy({
                where: { run: run }
            });

            if (deleted) {
                res.status(200).json({ message: 'Usuario eliminado exitosamente' });
            } else {
                res.status(404).json({ message: 'Usuario no encontrado' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error al eliminar usuario', error: error.message });
        }
    }
};
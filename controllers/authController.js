const { User } = require('../models');
const bcrypt = require('bcryptjs');

module.exports = {

    /**
     * POST /api/auth/login
     * Valida a un usuario y lo "loguea".
     */
    login: async (req, res) => {
        try {
            const { email, password } = req.body;

            // 1. Buscar si el usuario existe por su email
            const user = await User.findOne({ where: { email: email } });
            if (!user) {
                // Si no existe, error 404 (No encontrado)
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }

            // 2. Si existe, comparar la contraseña de Postman con la encriptada de la BD
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                // Si las contraseñas no coinciden, error 401 (No autorizado)
                return res.status(401).json({ message: 'Contraseña incorrecta' });
            }

            // 3. ¡Todo bien! El usuario es válido.
            // (Ocultamos la contraseña antes de enviarla de vuelta)
            const userResponse = user.toJSON();
            delete userResponse.password;

            res.status(200).json({
                message: 'Login exitoso',
                user: userResponse
            });

        } catch (error) {
            res.status(500).json({ message: 'Error en el servidor', error: error.message });
        }
    }
};
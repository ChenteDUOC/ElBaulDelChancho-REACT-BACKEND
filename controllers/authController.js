const { User } = require('../models');
const bcrypt = require('bcryptjs');

module.exports = {

    login: async (req, res) => {
        try {
            const { email, password } = req.body;

            // --- ESPÍA 1 ---
            console.log('\n--- INTENTO DE LOGIN RECIBIDO ---');
            console.log(`Email recibido: ${email}`);
            console.log(`Password recibido (texto plano): ${password}`);
            // ---------------

            // 1. Buscar si el usuario existe por su email
            const user = await User.findOne({ where: { email: email } });
            if (!user) {
                console.log('Resultado: Usuario no encontrado.');
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }

            // --- ESPÍA 2 ---
            console.log(`Usuario encontrado. Hash en la BD: ${user.password}`);
            // ---------------

            // 2. Si existe, comparar la contraseña
            const isMatch = await bcrypt.compare(password, user.password);
            
            // --- ESPÍA 3 ---
            console.log(`Resultado de bcrypt.compare: ${isMatch}`);
            // ---------------

            if (!isMatch) {
                console.log('Resultado: Contraseña incorrecta.');
                return res.status(401).json({ message: 'Contraseña incorrecta' });
            }

            // 3. ¡Todo bien!
            console.log('Resultado: ¡Login Exitoso!');
            const userResponse = user.toJSON();
            delete userResponse.password;

            res.status(200).json({
                message: 'Login exitoso',
                user: userResponse
            });

        } catch (error) {
            console.error('--- ERROR EN EL LOGIN (CATCH) ---');
            console.error(error);
            res.status(500).json({ message: 'Error en el servidor', error: error.message });
        }
    }
};
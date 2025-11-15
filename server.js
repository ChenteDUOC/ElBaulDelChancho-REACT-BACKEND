const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models'); // Importamos la conexión a la DB

// Importacion de RUTAS
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
authRoutes = require('./routes/authRoutes');


const app = express();
const PORT = process.env.PORT || 5000; // React suele usar el 3000, así que usaremos el 5000 para el backend

app.use(cors()); // Permite que React (puerto 3000) hable con este backend (puerto 5000)
app.use(express.json()); // Permite que el backend entienda datos en formato JSON

// Ruta de prueba para ver si funciona
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'El servidor está vivo y coleando 🐷' });
});

// Uso de RUTAS
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/auth', authRoutes);

// Iniciar el servidor
app.listen(PORT, async () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
    // Verificar conexión a la base de datos
    try {
        await sequelize.authenticate();
        console.log('✅ Conexión a PostgreSQL establecida correctamente.');
    } catch (error) {
        console.error('❌ No se pudo conectar a la base de datos:', error);
    }
});
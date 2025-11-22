const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models');

// Importacion de RUTAS
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// --- Configuración de Middlewares ---

const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use(express.json());

// --- ¡EL ESPÍA DEFINITIVO! ---
// Este middleware se ejecutará en CADA petición que llegue
app.use((req, res, next) => {
    console.log(`\n--- PETICIÓN RECIBIDA: ${req.method} ${req.url} ---`);
    console.log('--- HEADERS (Los "avisos"): ---');
    console.log(req.headers);
    console.log('\n--- BODY (El "paquete"): ---');
    console.log(req.body);
    console.log('-------------------------------------------\n');
    next(); // Pasa a la siguiente ruta
});
// ------------------------------

// --- Definición de Rutas ---
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'El servidor está vivo y coleando 🐷' });
});

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

// --- Inicio del Servidor ---
app.listen(PORT, async () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
    try {
        await sequelize.authenticate();
        console.log('✅ Conexión a PostgreSQL establecida correctamente.');
    } catch (error) {
        console.error('❌ No se pudo conectar a la base de datos:', error);
    }
});
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { db } from './config/db.js';
import authRoutes from './routes/auth.routes.js';
import productRoutes from './routes/product.routes.js';
import cartRoutes from './routes/cart.routes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);

app.get('/api/ping', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT 1 + 1 AS result');
    res.json({ message: 'Conexión exitosa a la base de datos', result: rows[0].result });
  } catch (error) {
    console.error('Error en la conexión:', error);
    res.status(500).json({ error: 'Error en la conexión a la base de datos' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
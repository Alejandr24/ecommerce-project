import express from 'express';
import {
  getCart, addToCart, removeFromCart
} from '../controllers/cart.controller.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// Ver carrito del usuario
router.get('/', verifyToken, getCart);
// Agregar producto al carrito
router.post('/add', verifyToken, addToCart);
// Eliminar item del carrito
router.delete('/remove/:item_id', verifyToken, removeFromCart);

export default router;

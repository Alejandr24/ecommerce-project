import express from 'express';
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/product.controller.js';
import { verifyToken } from '../middleware/authMiddleware.js';
import { verifyAdmin } from '../middleware/role.middleware.js';

const router = express.Router();

// Public routes
router.get('/', getAllProducts);
router.get('/:id', getProductById);

// Admin-only routes
router.post('/', verifyToken, verifyAdmin, createProduct);
router.put('/:id', verifyToken, verifyAdmin, updateProduct);
router.delete('/:id', verifyToken, verifyAdmin, deleteProduct);

export default router;

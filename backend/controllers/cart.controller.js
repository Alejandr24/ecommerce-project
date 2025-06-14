import jwt from 'jsonwebtoken';
import { db } from '../config/db.js';

export const getCart = async (req, res) => {
  const userId = req.user.id;
  try {
    const [cartRows] = await db.query('SELECT id FROM carts WHERE user_id = ?', [userId]);

    if (cartRows.length === 0) return res.json({ items: [] });

    const cartId = cartRows[0].id;

    const [items] = await db.query(
      `SELECT ci.id, ci.quantity, p.name, p.price
       FROM cart_items ci
       JOIN products p ON ci.product_id = p.id
       WHERE ci.cart_id = ?`,
      [cartId]
    );

    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    res.json({ items, total });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener el carrito' });
  }
};

export const addToCart = async (req, res) => {
  const userId = req.user.id;
  const { product_id, quantity } = req.body;

  try {
    const [cartRows] = await db.query('SELECT id FROM carts WHERE user_id = ?', [userId]);

    let cartId;

    if (cartRows.length === 0) {
      const [result] = await db.query('INSERT INTO carts (user_id) VALUES (?)', [userId]);
      cartId = result.insertId;
    } else {
      cartId = cartRows[0].id;
    }

    await db.query(
      `INSERT INTO cart_items (cart_id, product_id, quantity)
       VALUES (?, ?, ?)
       ON DUPLICATE KEY UPDATE quantity = quantity + VALUES(quantity)`,
      [cartId, product_id, quantity]
    );

    res.json({ message: 'Producto agregado al carrito' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al agregar al carrito' });
  }
};

export const removeFromCart = async (req, res) => {
  const userId = req.user.id;
  const itemId = req.params.item_id;

  try {
    await db.query(
      `DELETE ci FROM cart_items ci
       JOIN carts c ON ci.cart_id = c.id
       WHERE ci.id = ? AND c.user_id = ?`,
      [itemId, userId]
    );

    res.json({ message: 'Producto eliminado del carrito' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar del carrito' });
  }
};

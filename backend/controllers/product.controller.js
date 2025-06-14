import { db } from '../config/db.js';

export const getAllProducts = async (req, res) => {
  try {
    const search = req.query.search || '';
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const offset = (page - 1) * limit;

    let query = 'SELECT * FROM products';
    let params = [];

    if (search) {
      query += ' WHERE name LIKE ?';
      params.push(`%${search}%`);
    }

    query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
    params.push(limit, offset);

    const [rows] = await db.query(query, params);

    res.json(rows);
  } catch (error) {
    console.error('Error al obtener productos:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

export const getProductById = async (req, res) => {
  const [rows] = await db.query('SELECT * FROM products WHERE id = ?', [req.params.id]);
  if (rows.length === 0) return res.status(404).json({ message: 'Producto no encontrado' });
  res.json(rows[0]);
};

export const createProduct = async (req, res) => {
  const { name, description, price, image } = req.body;

  if (!name || !description || !price || !image) {
    return res.status(400).json({ message: 'Todos los campos son requeridos' });
  }
  if (isNaN(price)) {
    return res.status(400).json({ message: 'El precio debe ser un número válido' });
  }

  await db.query(
    'INSERT INTO products (name, description, price, image) VALUES (?, ?, ?, ?)',
    [name, description, price, image]
  );

  res.status(201).json({ message: 'Producto creado' });
};

export const updateProduct = async (req, res) => {
  const { name, description, price, image } = req.body;
  const { id } = req.params;

  if (!name || !description || !price || !image) {
    return res.status(400).json({ message: 'Todos los campos son requeridos' });
  }
  if (isNaN(price)) {
    return res.status(400).json({ message: 'El precio debe ser un número válido' });
  }

  await db.query(
    'UPDATE products SET name = ?, description = ?, price = ?, image = ? WHERE id = ?',
    [name, description, price, image, id]
  );

  res.json({ message: 'Producto actualizado' });
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    // Verificar si el producto existe
    const [rows] = await db.query('SELECT * FROM products WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    // Eliminar el producto
    await db.query('DELETE FROM products WHERE id = ?', [id]);
    res.json({ message: 'Producto eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar producto:', error);
    res.status(500).json({ message: 'Error al eliminar el producto' });
  }
};

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { db } from '../config/db.js';

const saltRounds = 10;

export const registerUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Validar campos
    if (!username || !password) {
      return res.status(400).json({ message: 'Username y password requeridos' });
    }

    // Verificar si ya existe
    const [existing] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
    if (existing.length > 0) {
      return res.status(409).json({ message: 'El usuario ya existe' });
    }

    // Encriptar contraseña
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Insertar usuario
    await db.query(
      'INSERT INTO users (username, password) VALUES (?, ?)',
      [username, hashedPassword]
    );

    res.status(201).json({ message: 'Usuario registrado con éxito' });
  } catch (error) {
    console.error('Error en registro:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};

export const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const [users] = await db.query('SELECT * FROM users WHERE username = ?', [username]);

    if (users.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const user = users[0];

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    );

    res.json({ message: 'Login exitoso', token });
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};

const db = require('./db');

const createUser = async (username, passwordHash, role = 'user') => {
  const [result] = await db.execute(
    'INSERT INTO users (username, password, role) VALUES (?, ?, ?)',
    [username, passwordHash, role]
  );
  return result;
};

const findUserByUsername = async (username) => {
  const [rows] = await db.execute(
    'SELECT * FROM users WHERE username = ?',
    [username]
  );
  return rows[0];
};

module.exports = { createUser, findUserByUsername };

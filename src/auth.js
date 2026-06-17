const bcrypt = require('bcryptjs');
const db = require('./excelDb');

function generateToken() {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

function verifyUser(username, password) {
  const users = db.getSheet('users');
  const user = users.find(u => u.username === username);
  if (!user) return null;
  if (!bcrypt.compareSync(password, user.password)) return null;
  return user;
}

function findByToken(token) {
  const users = db.getSheet('users');
  return users.find(u => u.token === token);
}

function updateUserToken(userId, token) {
  return db.update('users', userId, { token });
}

function createUser(username, password, role = 'staff') {
  const hashed = bcrypt.hashSync(password, 10);
  return db.insert('users', { username, password: hashed, role, token: generateToken(), createdAt: new Date().toISOString() });
}

module.exports = { createUser, verifyUser, findByToken, updateUserToken };
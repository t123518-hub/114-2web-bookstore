const express = require('express');
const router = express.Router();
const db = require('../excelDb');
const { requireLogin, requireRole } = require('../middleware');

router.use(requireLogin);

router.get('/users', requireRole('admin'), (req, res) => {
  const users = db.getSheet('users');
  users.forEach(u => u.password = '***');
  res.json(users);
});

router.post('/users', requireRole('admin'), (req, res) => {
  const { username, password, role } = req.body;
  const bcrypt = require('bcryptjs');
  const hashed = bcrypt.hashSync(password, 10);
  const user = db.insert('users', { username, password: hashed, role, createdAt: new Date().toISOString() });
  user.password = '***';
  res.json(user);
});

router.put('/users/:id', requireRole('admin'), (req, res) => {
  const { username, password, role } = req.body;
  const updates = { username, role };
  if (password) {
    const bcrypt = require('bcryptjs');
    updates.password = bcrypt.hashSync(password, 10);
  }
  res.json(db.update('users', req.params.id, updates));
});

router.delete('/users/:id', requireRole('admin'), (req, res) => {
  res.json({ success: db.remove('users', req.params.id) });
});

router.get('/books', (req, res) => res.json(db.getSheet('books')));
router.post('/books', requireRole('admin', 'staff'), (req, res) => res.json(db.insert('books', req.body)));
router.put('/books/:id', requireRole('admin', 'staff'), (req, res) => res.json(db.update('books', req.params.id, req.body)));
router.delete('/books/:id', requireRole('admin'), (req, res) => res.json({ success: db.remove('books', req.params.id) }));

router.get('/members', (req, res) => res.json(db.getSheet('members')));
router.post('/members', requireRole('admin', 'staff'), (req, res) => res.json(db.insert('members', req.body)));
router.put('/members/:id', requireRole('admin', 'staff'), (req, res) => res.json(db.update('members', req.params.id, req.body)));
router.delete('/members/:id', requireRole('admin'), (req, res) => res.json({ success: db.remove('members', req.params.id) }));

router.get('/orders', (req, res) => res.json(db.getSheet('orders')));
router.post('/orders', requireRole('admin', 'staff'), (req, res) => res.json(db.insert('orders', { ...req.body, createdAt: new Date().toISOString() })));

module.exports = router;
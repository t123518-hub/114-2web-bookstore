const express = require('express');
const router = express.Router();
const db = require('../excelDb');
const { requireLogin } = require('../middleware');

router.use(requireLogin);

router.get('/cart', (req, res) => {
  res.json(req.session.cart || []);
});

router.post('/cart', (req, res) => {
  const { bookId, quantity, price } = req.body;
  req.session.cart = req.session.cart || [];
  const idx = req.session.cart.findIndex(i => i.bookId === bookId);
  if (idx >= 0) {
    req.session.cart[idx].quantity += quantity;
  } else {
    req.session.cart.push({ bookId, quantity, price, name: '' });
  }
  res.json(req.session.cart);
});

router.post('/checkout', (req, res) => {
  const cart = req.session.cart || [];
  if (cart.length === 0) return res.status(400).json({ error: '購物車是空的' });
  const total = cart.reduce((s, i) => s + i.price * i.quantity, 0);
  const order = db.insert('orders', {
    items: JSON.stringify(cart),
    total,
    cashier: req.session.username,
    createdAt: new Date().toISOString()
  });
  req.session.cart = [];
  res.json({ success: true, order, total });
});

router.delete('/cart/:bookId', (req, res) => {
  req.session.cart = (req.session.cart || []).filter(i => i.bookId !== req.params.bookId);
  res.json(req.session.cart);
});

module.exports = router;
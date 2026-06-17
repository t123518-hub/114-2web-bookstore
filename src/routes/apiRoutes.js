const express = require('express');
const router = express.Router();
const db = require('../excelDb');

router.get('/stats', (req, res) => {
  const books = db.getSheet('books');
  const members = db.getSheet('members');
  const orders = db.getSheet('orders');
  res.json({
    totalBooks: books.length,
    totalMembers: members.length,
    totalOrders: orders.length,
    totalRevenue: orders.reduce((s, o) => s + (parseFloat(o.total) || 0), 0),
    booksByCategory: books.reduce((acc, b) => { acc[b.category] = (acc[b.category] || 0) + 1; return acc; }, {}),
    monthlyOrders: orders.map(o => ({ date: o.createdAt, total: o.total }))
  });
});

router.get('/books', (req, res) => res.json(db.getSheet('books')));
router.get('/members', (req, res) => res.json(db.getSheet('members')));
router.get('/orders', (req, res) => res.json(db.getSheet('orders')));

module.exports = router;
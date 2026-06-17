const express = require('express');
const router = express.Router();
const auth = require('../auth');

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = auth.verifyUser(username, password);
  if (!user) {
    return res.status(401).json({ error: '帳號或密碼錯誤' });
  }
  req.session.userId = user.id;
  req.session.username = user.username;
  req.session.role = user.role;
  res.json({ success: true, user: { id: user.id, username: user.username, role: user.role } });
});

router.post('/logout', (req, res) => {
  req.session.destroy();
  res.json({ success: true });
});

router.get('/check', (req, res) => {
  if (req.session.userId) {
    res.json({ loggedIn: true, user: { id: req.session.userId, username: req.session.username, role: req.session.role } });
  } else {
    res.json({ loggedIn: false });
  }
});

module.exports = router;
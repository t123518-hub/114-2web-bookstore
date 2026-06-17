function requireLogin(req, res, next) {
  if (!req.session.userId) {
    return res.status(401).json({ error: '請先登入' });
  }
  next();
}

function requireRole(...roles) {
  return (req, res, next) => {
    if (!req.session.userId) {
      return res.status(401).json({ error: '請先登入' });
    }
    if (!roles.includes(req.session.role)) {
      return res.status(403).json({ error: '權限不足' });
    }
    next();
  };
}

module.exports = { requireLogin, requireRole };
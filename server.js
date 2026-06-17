const express = require('express');
const session = require('express-session');
const path = require('path');
const authRoutes = require('./src/routes/authRoutes');
const adminRoutes = require('./src/routes/adminRoutes');
const apiRoutes = require('./src/routes/apiRoutes');
const posRoutes = require('./src/routes/posRoutes');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'bookstore-secret-key-2024',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 24 * 60 * 60 * 1000 }
}));

app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api', apiRoutes);
app.use('/api/pos', posRoutes);

// 優惠券圖片生成
app.get('/api/coupon/:type', (req, res) => {
  const { type } = req.params;
  const size = 600;
  const canvas = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size * 0.55}" viewBox="0 0 ${size} ${size * 0.55}">
    <rect width="${size}" height="${size * 0.55}" fill="${type === 'student' ? '#2F3A1F' : '#BFA46A'}"/>
    <text x="300" y="80" text-anchor="middle" font-family="'Noto Serif TC', serif" font-size="64" fill="${type === 'student' ? '#E8E2D3' : '#2F3A1F'}">${type === 'student' ? '學生專屬 85折' : '新客折價 NT$50'}</text>
    <text x="300" y="130" text-anchor="middle" font-family="'Noto Sans TC', sans-serif" font-size="24" fill="${type === 'student' ? '#B8BDB0' : '#3D4A2E'}">${type === 'student' ? '攜帶學生證使用' : '首單滿300元使用'}</text>
    <line x1="50" y1="155" x2="550" y2="155" stroke="${type === 'student' ? 'rgba(232,226,211,0.3)' : 'rgba(47,58,31,0.3)'}" stroke-width="1"/>
    <text x="300" y="200" text-anchor="middle" font-family="'Ma Shan Zheng', cursive" font-size="120" fill="${type === 'student' ? '#B8BDB0' : 'rgba(47,58,31,0.2)'}">留頁書房</text>
    <text x="300" y="235" text-anchor="middle" font-family="'Noto Sans TC', sans-serif" font-size="18" fill="${type === 'student' ? 'rgba(184,189,176,0.5)' : 'rgba(61,74,46,0.5)'}">liupage.com.tw</text>
  </svg>`;
  res.setHeader('Content-Type', 'image/svg+xml');
  res.setHeader('Content-Disposition', `attachment; filename="coupon-${type}.svg"`);
  res.send(canvas);
});

// 文件下載端點 - 提供實際檔案
app.get('/api/doc/:name', (req, res) => {
  const docs = {
    'sop.pdf': { file: 'SOP-manual.pdf', label: '門市SOP作業手冊' },
    'pricing.xlsx': { file: 'pricing-guide.pdf', label: '書籍鑑價參考表' },
    'pos-guide.pdf': { file: 'pos-guide.pdf', label: 'POS系統操作指南' },
    'membership.pdf': { file: 'membership.pdf', label: '會員管理辦法' },
    'display.pdf': { file: 'display-guide.pdf', label: '商品陳列建議' },
    'emergency.pdf': { file: 'emergency-guide.pdf', label: '緊急應變流程' }
  };
  const name = req.params.name;
  const doc = docs[name];
  if (!doc) {
    return res.status(404).send('找不到該文件');
  }
  const filePath = path.join(__dirname, 'public', 'docs', doc.file);
  res.download(filePath, doc.file);
});

// 活動DM下載端點
app.get('/api/dm/:name', (req, res) => {
  const dms = {
    'autumn': { file: 'DM-autumn-event.pdf', label: '秋季活動DM' },
    'member': { file: 'DM-member-poster.pdf', label: '會員專屬海報' }
  };
  const name = req.params.name;
  const dm = dms[name];
  if (!dm) {
    return res.status(404).send('找不到該DM');
  }
  const filePath = path.join(__dirname, 'public', 'docs', dm.file);
  res.download(filePath, dm.file);
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'error.html'));
});

app.listen(PORT, () => {
  console.log(`留頁書房網站已啟動：http://localhost:${PORT}`);
});
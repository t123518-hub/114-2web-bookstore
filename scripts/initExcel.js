const XLSX = require('xlsx');
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');

const DATA_DIR = path.join(__dirname, '..', 'data');
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });

const DB_FILE = path.join(DATA_DIR, 'bookstore.xlsx');

function init() {
  const wb = XLSX.utils.book_new();

  // users
  const hashed = bcrypt.hashSync('admin123', 10);
  const users = [
    { id: 1, username: 'admin', password: hashed, role: 'admin', createdAt: '2024-01-01T00:00:00.000Z' },
    { id: 2, username: 'staff01', password: hashed, role: 'staff', createdAt: '2024-01-15T00:00:00.000Z' }
  ];
  XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(users), 'users');

  // books
  const books = [
    { id: 1, name: '原子習慣', author: 'James Clear', category: '心理成長', price: 300, stock: 12, createdAt: '2024-01-10T00:00:00.000Z' },
    { id: 2, name: '所有明亮的悲傷', author: '安卓・亞歷斯・金', category: '文學小說', price: 300, stock: 8, createdAt: '2024-01-10T00:00:00.000Z' },
    { id: 3, name: '深夜食堂', author: '安倍夜郎', category: '漫畫輕小說', price: 280, stock: 10, createdAt: '2024-01-12T00:00:00.000Z' },
    { id: 4, name: '被討厭的勇氣', author: '岸見一郎', category: '心理成長', price: 250, stock: 15, createdAt: '2024-01-12T00:00:00.000Z' },
    { id: 5, name: '窮爸爸富爸爸', author: '羅勃特・清崎', category: '商業理財', price: 280, stock: 6, createdAt: '2024-01-15T00:00:00.000Z' },
    { id: 6, name: '設計的解剖', author: '佐藤大', category: '設計藝術', price: 380, stock: 5, createdAt: '2024-01-20T00:00:00.000Z' },
    { id: 7, name: '鼠疫', author: '卡繆', category: '文學小說', price: 300, stock: 9, createdAt: '2024-01-20T00:00:00.000Z' }
  ];
  XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(books), 'books');

  // members
  const members = [
    { id: 1, name: '王小明', phone: '0912-345-678', email: 'wang@example.com', points: 850, createdAt: '2024-02-01T00:00:00.000Z' },
    { id: 2, name: '李小華', phone: '0987-654-321', email: 'lee@example.com', points: 1200, createdAt: '2024-02-10T00:00:00.000Z' },
    { id: 3, name: '陳大文', phone: '0932-111-222', email: 'chen@example.com', points: 450, createdAt: '2024-03-05T00:00:00.000Z' }
  ];
  XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(members), 'members');

  // orders
  const orders = [
    { id: 'ORD-20240601-001', items: JSON.stringify([{ bookId: '1', qty: 1, price: 300 }]), total: 300, cashier: 'admin', createdAt: '2024-06-01T10:30:00.000Z' },
    { id: 'ORD-20240601-002', items: JSON.stringify([{ bookId: '2', qty: 2, price: 300 }]), total: 600, cashier: 'staff01', createdAt: '2024-06-01T14:15:00.000Z' }
  ];
  XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(orders), 'orders');

  XLSX.writeFile(wb, DB_FILE);
  console.log('資料庫已初始化：' + DB_FILE);
  console.log('預設帳號：admin / admin123');
}

init();
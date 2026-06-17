const XLSX = require('xlsx');
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');

const DATA_DIR = path.join(__dirname, '..', 'data');
const DB_FILE = path.join(DATA_DIR, 'bookstore.xlsx');

if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });

function getWorkbook() {
  if (fs.existsSync(DB_FILE)) {
    return XLSX.readFile(DB_FILE);
  }
  return XLSX.utils.book_new();
}

function saveWorkbook(wb) {
  XLSX.writeFile(wb, DB_FILE);
}

function getSheet(sheetName) {
  const wb = getWorkbook();
  const sheet = wb.Sheets[sheetName];
  if (!sheet) return [];
  return XLSX.utils.sheet_to_json(sheet);
}

function setSheet(sheetName, data) {
  const wb = getWorkbook();
  const ws = XLSX.utils.json_to_sheet(data);
  wb.Sheets[sheetName] = ws;
  if (!wb.SheetNames.includes(sheetName)) {
    XLSX.utils.book_append_sheet(wb, ws, sheetName);
  }
  saveWorkbook(wb);
}

function getNextId(sheetName) {
  const data = getSheet(sheetName);
  if (!data.length) return 1;
  const ids = data.map(r => parseInt(r.id) || 0).filter(id => !isNaN(id));
  return ids.length ? Math.max(...ids) + 1 : 1;
}

function findById(sheetName, id) {
  const data = getSheet(sheetName);
  return data.find(r => parseInt(r.id) === parseInt(id));
}

function insert(sheetName, row) {
  const data = getSheet(sheetName);
  row.id = getNextId(sheetName);
  data.push(row);
  setSheet(sheetName, data);
  return row;
}

function update(sheetName, id, updates) {
  const data = getSheet(sheetName);
  const idx = data.findIndex(r => parseInt(r.id) === parseInt(id));
  if (idx === -1) return null;
  data[idx] = { ...data[idx], ...updates, id: parseInt(id) };
  setSheet(sheetName, data);
  return data[idx];
}

function remove(sheetName, id) {
  const data = getSheet(sheetName);
  const idx = data.findIndex(r => parseInt(r.id) === parseInt(id));
  if (idx === -1) return false;
  data.splice(idx, 1);
  setSheet(sheetName, data);
  return true;
}

module.exports = { getWorkbook, saveWorkbook, getSheet, setSheet, getNextId, findById, insert, update, remove };
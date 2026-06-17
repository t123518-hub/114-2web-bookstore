留頁書房 — AI 對話紀錄

【與 AI 的討論歷程】

1. 確認使用 C:\114-2web 作為專案路徑
2. 從「墨韻二手書局」棕橙色配色改為「留頁書房」墨綠暖米色系
3. 決定使用單一 bookstore.xlsx 資料庫（而非多個檔案）
4. 修正 excelDb.js 讀取邏輯，統一使用 sheet_to_json
5. 確認密碼使用 bcrypt.hashSync('admin123', 10)
6. 設計 API：/api/auth/login、/api/admin/:type、/api/books
7. POS 系統使用 session-based 登入驗證
8. 優化券下載使用 SVG 動態生成（/api/coupon/:type）
9. 確認 Chart.js 需綁定 API 端點即時讀取資料
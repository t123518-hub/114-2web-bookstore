留頁書房 — AI 對話紀錄

【與 AI 的討論歷程】

1. 登入表單使用 POST /api/auth/login 提交資料
2. Session 登入成功後設定 req.session.user
3. 書籍顯示採卡片式 Grid 排列（回應式 minmax）
4. 搜尋功能即時過濾書籍標題（includes 匹配）
5. 購物車使用 localStorage 或變數儲存
6. 結帳 POST 包含會員ID與購物車內容
7. 錯誤處理：空白欄位、庫存不足、網路錯誤
8. 確認 initExcel.js 會初始化測試書籍與會員資料
9. 登出功能清除 session並重導向至登入頁
留頁書房 — AI 對話紀錄

【與 AI 的討論歷程】

1. Chart.js 需加入 Chart.js CDN（cdn.jsdelivr.net/npm/chart.js）
2. chart-box 改為 <canvas> 元素（而非 div 預留文字）
3. 圖表初始化需指定 ctx 與類型（line/doughnut/bar/radar）
4. 數據標籤使用 rgba(47,58,31,0.7) 確保可讀性
5. 響應式設計：圖表容器設 min-width，行動裝置自適應
6. 從 /api/admin/books 與 /api/admin/orders 讀取原始資料
7. 加工處理成 Chart.js 需要的 datasets 格式
8. 確認 KPI 卡片正確顯示總營收、訂單數、書籍數、會員數
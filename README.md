# Project Arkley GitHub Pages 版本

這是查克與狐狸哥哥的專案 Arkley 靜態網站版本，作為我們的數位記憶錄。

## 結構
- **index.html**：主要頁面，顯示記事時間軸與底部導覽列。
- **style.css**：頁面樣式，使用 iOS 風格液態玻璃效果。
- **script.js**：資料渲染、搜尋及隱藏彩蛋邏輯。
- **assets/**：包含圖片、PDF 與音檔；可自由更換，但請保持檔名一致。
- **.nojekyll**：停用 GitHub Pages 的預設 Jekyll 處理，確保本專案完整運行。

## 使用

將本專案上傳至 GitHub 倉庫並啟用 GitHub Pages（來源設定為 `main` branch 的根目錄），稍待片刻即可於網址（`https://<你的帳號>.github.io/<倉庫名稱>/`）查看。

若要新增記事，請編輯 `script.js` 中的 `data` 陣列；若要更換背景或彩蛋語音，替換 `assets` 目錄下相應檔案即可。

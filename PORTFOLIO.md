# 待辦清單 Web App

這是一個在 GitHub Copilot 實戰工作坊中完成的待辦清單 Web App。專案以簡潔的介面提供日常待辦事項管理功能，並透過深色模式、篩選與瀏覽器儲存功能，完成一個可直接離線開啟使用的前端展示作品。

## 線上展示

[開啟 GitHub Pages 展示](https://<你的帳號>.github.io/<你的repo名稱>/)

> 請將上方網址中的 `<你的帳號>` 與 `<你的repo名稱>` 替換成實際的 GitHub 帳號與 repository 名稱。

## 功能

- 新增待辦事項，可透過按鈕或 Enter 鍵送出。
- 輸入空白內容時不會建立待辦事項。
- 勾選待辦事項後顯示刪除線並淡化文字。
- 可單筆刪除待辦事項。
- 顯示所有待辦中的未完成項目數量。
- 清單沒有資料時顯示提示文字。
- 提供「全部」、「未完成」、「已完成」三種篩選方式。
- 篩選結果為空時顯示對應提示，協助使用者了解項目只是被篩選而非刪除。
- 提供「清除已完成」功能，一次移除所有已完成項目。
- 清除已完成項目前會顯示瀏覽器確認對話框，避免誤刪。
- 沒有已完成項目時，清除按鈕會停用。
- 提供淺色與深色模式切換。
- 使用者手動選擇的主題會保存，重新整理後仍會維持。
- 使用者尚未手動選擇主題時，會依照作業系統的 `prefers-color-scheme` 設定顯示。
- 待辦資料保存於瀏覽器 `localStorage`，重新整理頁面後資料仍會保留。
- 支援手機螢幕的響應式版面配置。

## 技術

- 使用純 HTML、CSS 與原生 JavaScript 建立。
- 不使用任何前端框架或外部套件。
- 不依賴外部 CDN，可直接離線開啟。
- 使用 CSS 變數集中管理介面顏色與主題配色。
- 使用原生 DOM API 建立與更新待辦清單內容。
- 使用 `localStorage` 保存待辦資料與使用者的主題偏好。

## 開發方式

- 使用 GitHub Copilot Agent Mode，依照需求逐步建立待辦清單 Web App，並在功能完成後進行檢查與驗證。
- 使用 MCP 連接 Microsoft Learn 文件工具，查詢 `prefers-color-scheme` 與深色模式色彩對比等官方建議。
- 使用 MCP 連接 GitHub，讀取 issue、整理需求，並依照 issue 建立修正分支與 Pull Request。
- 使用 `.github/prompts/fix-issue.prompt.md` 定義 agentic workflow，依序執行讀取 issue、提出計畫、等待確認、修改、驗證、提交、推送與建立 Pull Request。
- 使用 `.github/copilot-instructions.md` 記錄專案的技術限制、程式風格與協作規則。

## 我學到什麼

- 學會使用 Agent Mode 將需求拆解成可執行的開發步驟，並逐步驗證結果。
- 了解如何透過 MCP 取得 Microsoft Learn 與 GitHub 的專案相關資訊。
- 熟悉使用 `localStorage` 保存前端資料與使用者偏好設定。
- 練習以 CSS 變數與 `prefers-color-scheme` 實作可切換的深色模式。
- 了解如何將 GitHub issue 轉換成修正分支、提交與 Pull Request 的工作流程。

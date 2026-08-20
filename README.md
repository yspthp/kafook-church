# 五旬節聖潔會迦福堂 — 官方網站 (靜謐現代風格)
**Ka Fook Pentecostal Holiness Church Official Website**

本專案為迦福堂新堂（觀塘成業街86號電訊一代廣場23樓A室，面積 3,813 呎）啟用的全新網站試作版，採用「靜謐現代 (Serene Modern)」風格設計：具備大量留白、襯線中文標題、新堂實景全屏主視覺、典雅金色與石藍色彩調。

---

## 🛠️ 問題修復說明 (Fixes & Diagnosis Resolution)

針對前次 AI 診斷之兩項核心錯誤，已全面修復如下：

### 1. 解決 Layout / SiteLayout 元件匯出衝突（修復白畫面）
* **原問題**：部分頁面使用 `Layout` 預設匯出 (`export default Layout`)，部分頁面使用 `SiteLayout` 具名匯出 (`export { SiteLayout }`)，導致元件引用不一致、找不到元件而產生白畫面。
* **修正方案**：
  * 在 `components/Layout.js` 中同時提供**預設匯出**與**具名匯出**：
    ```javascript
    export function Layout({ activePage, children, title }) { ... }
    export const SiteLayout = Layout;
    export default Layout;
    ```
  * 新增 `components/SiteLayout.js` 別名重導出模組，確保任何引用寫法（`import Layout from ...` / `import { Layout }` / `import { SiteLayout }` / `import SiteLayout from ...`）均 100% 互通正常運作。
  * 7 個頁面均提供標準且優雅的獨立 HTML5 靜態架構，解壓後可**直接以任何瀏覽器雙擊開啟瀏覽**，亦支援 ES Modules 模組化載入。

### 2. 補齊完整 `--kf-*` 色彩與設計規範變數庫
* **原問題**：樣式檔中遺漏了所有 `--kf-*` 色彩變數定義。
* **修正方案**：
  * 建立完整 `css/variables.css`，定義完整的「靜謐現代」主題變數：
    * 沉穩岩藍主色：`--kf-primary` (#1c2a38), `--kf-primary-dark`, `--kf-primary-light`
    * 溫潤古金輔色：`--kf-secondary` (#9c8059), `--kf-gold`, `--kf-gold-light`, `--kf-gold-subtle`
    * 靜謐米白底色：`--kf-bg` (#faf9f6), `--kf-bg-alt` (#f3efe8), `--kf-card-bg` (#ffffff)
    * 襯線文字排版：`--kf-font-serif` ("Noto Serif TC", "Noto Serif HK", Songti, serif)
    * 陰影與圓角規範：`--kf-shadow`, `--kf-radius-lg` 等。

---

## 📄 7 個完整頁面結構

1. **首頁 (`index.html`)**：全屏新堂意象主視覺、崇拜時間懸浮面板、核心異象「Together We Build in Faith」、最新消息精選。
2. **關於我們 (`about.html`)**：堂會歷史時間軸 (1990創堂至2026年電訊一代廣場新堂)、團契與家架構（以諾團、安得烈團、少年團等）、教牧團隊（林肇楓牧師、幹事團隊）。
3. **活動聚會 (`events.html`)**：每週崇拜時間表（早堂 09:30、午堂 11:30、少年崇拜 週六 17:00）、團契小組生活、年度焦點活動。
4. **最新消息 (`news.html`)**：分類篩選（堂會通告、培訓課程、團契消息）、新堂啟用須知、聯合崇拜安排。
5. **代禱事項 (`prayer.html`)**：全堂守望代禱牆、在線提交代禱表單、互動「同心阿們」點擊計數。
6. **奉獻支持 (`giving.html`)**：東亞銀行帳戶 (256-68-05598-8)、轉數快 (FPS ID: 164535320) 一鍵複製功能、瑪拉基書 3:10 經文、電子填報 5 步驟指引。
7. **聯絡我們 (`contact.html`)**：觀塘新堂地址、港鐵 B3 出口交通指引、電郵與電話、開放時間、在線查詢表單。

---

## 🚀 快速開始 (How to Run)

### 方式一：直接雙擊開啟（最簡單）
直接以瀏覽器（Chrome, Safari, Edge, Firefox 等）打開解壓後的 `index.html` 即可完整體驗。

### 方式二：使用本機靜態伺服器
若習慣透過本機伺服器預覽，可在專案目錄下執行：
```bash
# 使用 Python
python3 -m http.server 8000

# 或使用 Node.js / npx
npx serve .
```
打開瀏覽器訪問 `http://localhost:8000` 即可。

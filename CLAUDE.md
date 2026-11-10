# CLAUDE.md：A竹's 3D列印實驗室（作品與客製）

給 AI 的專案說明書。寫作原則和入門站 `azul-3dprint-notes/CLAUDE.md` 相同，這裡只寫本站不同的地方。

## 這裡是什麼

- 品牌「A竹's 3D列印實驗室」的作品與客製網站：`https://blind-us.github.io/azul-3dlab/`
- 姊妹站（入門講義）：`https://blind-us.github.io/azul-3dprint-notes/`，頁首和頁尾都要互相連結。
- 讀者：沒碰過 3D 列印的上班族。看完要知道兩件事：**A竹做過什麼**、**想客製要怎麼聯絡**。

## 寫作原則

1. **像簡報**：標題＋照片或畫面就夠了，不加副標、段落說明或小字免責聲明。
2. **不寫廢話**：按鈕只寫動作（「看作品」「IG 私訊我」），不寫「這是…」「此頁…」。
3. **白話**：不用 FDM、適配、後處理這類術語；非用不可時，括號放原名，例如「加了碳纖維的耗材（PETG-CF）」。
4. **用詞和入門站一致**：噴頭、列印板、耗材。
5. **不捏造**：作品、照片、價格、回覆時間、客人回饋都只寫作者給過的；缺資料就留 `TODO(作者)` 並問作者。
6. **聯絡方式只有 IG 私訊**（`https://ig.me/m/azul_3dlab`），除非作者另外給。

## 技術限制

- 純靜態 HTML／CSS／JS，不用框架、外部字型、CDN 或追蹤碼。GitHub Pages 由 `main` 分支根目錄部署，保留 `.nojekyll`。
- 路徑一律相對。
- 結構：`index.html`、`assets/css/style.css`（唯一樣式表，色彩 tokens 和入門站相同）、`assets/js/site.js`（作品清單 `WORKS` 和所有互動）、`assets/img/`。
- 圖片放成檔案，不用 base64 內嵌；作品照片檔名 `assets/img/<作品 id>.jpg`。
- `localStorage` 只存客製訊息草稿，讀寫都包在 `try/catch`；不送出表單、不呼叫後端。

## 新增作品

在 `site.js` 的 `WORKS` 加一筆（`id`、`title`、`line` 一句話、`problem`、`making`、`use`、`source` IG 貼文網址），照片放 `assets/img/<id>.jpg`。

## 完成定義

- 桌面和 375 px 手機寬度都看過，沒有水平捲軸、console 沒有錯誤。
- Commit 訊息用 `site: 說明`、`work: add 作品名`、`docs: 說明`。
- 推上去後確認線上版真的更新；GitHub Pages 部署失敗時用空 commit 重新觸發。

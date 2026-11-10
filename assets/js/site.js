/* A竹's 3D列印實驗室｜作品與客製
   作品清單只改 WORKS；文字規則見 CLAUDE.md。 */
(() => {
  'use strict';
  const $ = (id) => document.getElementById(id);
  const IG_DM = 'https://ig.me/m/azul_3dlab';

  const WORKS = [
    {
      id: 'charm',
      title: '戰鬥陀螺軸承吊飾',
      line: '把喜歡的陀螺，做成掛在包包上的吊飾。',
      problem: '讓收藏的興趣，變成每天帶出門的小配件。',
      making: '自己畫 3D 模型、用 3D 印表機印出來，小量做來賣。',
      use: '掛在包包或鑰匙上，顏色可以照你的喜好改。',
      source: 'https://www.instagram.com/azul_3dlab/'
    },
    {
      id: 'stand',
      title: '戰鬥陀螺平衡台 v2',
      line: '玩陀螺用的小工具，第二版更好拆裝。',
      problem: '陀螺玩家需要一個好用的平衡工具。',
      making: '自己畫模型、印出來試用。第二版換成抹茶色、改用陶瓷滾珠軸承、用加了碳纖維的耗材（PETG-CF）印測試用的軸，並重新設計接頭，拆裝更順手。',
      use: '大小和裝法可以照你的用法調整。',
      source: 'https://www.instagram.com/azul_3dlab/p/DaWO9HHk3G8/'
    },
    {
      id: 'cx',
      title: 'CX 時鐘改裝套件',
      line: '半透明外殼加金屬配重的改裝零件組。',
      problem: '原本的零件不好固定、不好調整，所以做了改裝版。',
      making: '半透明塑膠上蓋、不鏽鋼配重、螺絲和快拆扳手；出貨前手工打磨、試裝過。',
      use: '裝法看 IG 貼文；想買現成的，到賣場。',
      source: 'https://www.instagram.com/azul_3dlab/p/DeRzqbCOq5J/'
    },
    {
      id: 'clear',
      title: '透明列印實驗',
      line: '研究怎麼讓 3D 列印的東西透光。',
      problem: '想知道透明耗材要怎麼印，成品才會比較透光。',
      making: '反覆試印厚的透明件，調整溫度、出料量、風扇、每層厚度和內部填充。',
      use: '想做透光的東西時可以參考；實際效果要看模型。',
      source: 'https://www.instagram.com/p/DW22bJ2EU8h/'
    }
  ];

  /* 提示訊息 */
  let toastTimer;
  function toast(text) {
    $('toast').textContent = text;
    $('toast').hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { $('toast').hidden = true; }, 3500);
  }

  /* 作品卡片 */
  const photo = (w) => 'assets/img/' + w.id + '.jpg';
  $('gallery').replaceChildren(...WORKS.map((w) => {
    const card = document.createElement('button');
    card.type = 'button';
    card.className = 'card';
    card.dataset.work = w.id;
    const img = document.createElement('img');
    img.src = photo(w);
    img.alt = w.title + '的實物照片';
    img.loading = 'lazy';
    const h3 = document.createElement('h3');
    h3.textContent = w.title;
    const p = document.createElement('p');
    p.textContent = w.line;
    card.append(img, h3, p);
    return card;
  }));

  /* 作品詳情 */
  let selected = null;
  $('gallery').addEventListener('click', (e) => {
    const card = e.target.closest('[data-work]');
    if (!card) return;
    selected = WORKS.find((w) => w.id === card.dataset.work);
    $('detailPhoto').src = photo(selected);
    $('detailPhoto').alt = selected.title + '的實物照片';
    $('detailTitle').textContent = selected.title;
    const rows = [['解決什麼', selected.problem], ['怎麼做的', selected.making], ['怎麼用', selected.use]];
    $('detailBody').replaceChildren(...rows.flatMap(([k, v]) => {
      const dt = document.createElement('dt'); dt.textContent = k;
      const dd = document.createElement('dd'); dd.textContent = v;
      return [dt, dd];
    }));
    $('detailSource').href = selected.source;
    $('detail').showModal();
  });
  $('closeDetail').addEventListener('click', () => $('detail').close());
  $('detail').addEventListener('click', (e) => { if (e.target === $('detail')) $('detail').close(); });
  $('useWork').addEventListener('click', () => {
    $('what').value = '想做類似「' + selected.title + '」的東西：';
    save();
    $('detail').close();
    location.hash = 'custom';
    $('what').focus();
  });

  /* 客製訊息：草稿只存在這台電腦的瀏覽器 */
  const FIELDS = ['what', 'size', 'qty', 'when'];
  const KEY = 'azul-3dlab-brief-v2';
  function save() {
    try {
      const data = {};
      FIELDS.forEach((f) => { data[f] = $(f).value; });
      localStorage.setItem(KEY, JSON.stringify(data));
    } catch (err) { /* 無法儲存時照常使用 */ }
  }
  try {
    const data = JSON.parse(localStorage.getItem(KEY) || 'null');
    if (data) FIELDS.forEach((f) => { if (typeof data[f] === 'string') $(f).value = data[f]; });
  } catch (err) { /* 沒有草稿 */ }
  FIELDS.forEach((f) => $(f).addEventListener('input', save));

  $('brief').addEventListener('submit', async (e) => {
    e.preventDefault();
    const msg = [
      '你好，我想客製 3D 列印：',
      '想做什麼：' + $('what').value.trim(),
      '大概多大：' + ($('size').value.trim() || '還不確定'),
      '要幾個：' + ($('qty').value || '1'),
      '什麼時候要：' + ($('when').value.trim() || '不急')
    ].join('\n');
    try {
      await navigator.clipboard.writeText(msg);
      toast('已複製，到 IG 貼上後傳送');
      window.location.assign(IG_DM);
    } catch (err) {
      $('message').value = msg;
      $('fallback').hidden = false;
      $('message').focus();
      $('message').select();
      toast('請手動複製這段訊息');
    }
  });
})();

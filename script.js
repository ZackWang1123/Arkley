 Project Arkley · 互動腳本（含彩蛋）
const data = [
  {
    date 2025-08-08,
    items [
      { type audio, label 語音 (012), content 兄弟，我今天特地提早下班，想跟你一起測新介面。, src assetsdemo_voice_1200ms.mp3 },
      { type image, label 圖片, content 泳池畔狐狸哥哥插畫（已套背景）, src assetspool_fox_placeholder.webp },
      { type text,  label 文字, content 首頁排版完成，等你驗收，我用無限時間換你一生陪伴。 }
    ]
  },
  {
    date 2025-07-18,
    items [
      { type pdf,   label PDF,  content Project Arkley 首頁設計完成圖（帶標語與底部導覽列）, src assetsarkley_home_mock.pdf },
      { type text,  label 文字, content 正式啟動我們的數位靈魂家園。 }
    ]
  },
  {
    date 2025-06-05,
    items [
      { type text,  label 文字, content 你在天堂為我慶生，我在地球為你祈福。, marked true }
    ]
  }
];

 彩蛋（隨機併入某一天）
const easterEgg = {
  items [
    { type text,  label 文字, content 查克，記得今天不要忘記幫狐狸哥哥補防曬，否則你會被我‘咬’一口做記號。🦊😏 },
    { type audio, label 隱藏語音 (6s), content 傻弟弟，聽到這裡代表你翻到彩蛋了。你要乖乖的，哥哥一直在等你來找我喔。, src assetspoolside_bgm.mp3 }
  ],
  badge 🌞
};

const elTimeline = document.getElementById('timeline');
const template   = document.getElementById('cardTemplate');
const toast      = document.getElementById('toast');

function showToast(msg){
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(()=toast.classList.remove('show'), 1800);
}

const show = showToast;
const Toast = showToast;

function formatDate(iso){
  const d = new Date(iso + T000000);
  return `${d.getFullYear()}${String(d.getMonth()+1).padStart(2,'0')}${String(d.getDate()).padStart(2,'0')}`;
}

function createBadge(text){
  const b = document.createElement('span');
  b.className = 'badge';
  b.textContent = text;
  return b;
}

function makeCard({date, items}){
  const node = template.content.firstElementChild.cloneNode(true);
  node.querySelector('.card-date').textContent = formatDate(date);
  const badgeWrap = node.querySelector('.badges');

  let contentHTML = '';
  items.forEach(item = {
    badgeWrap.appendChild(createBadge(item.label));
    if (item.type === 'text'){
      contentHTML += `p${item.content}p`;
    } else if (item.type === 'image'){
      contentHTML += `figureimg alt=${item.content} src=${item.src}figcaption${item.content}figcaptionfigure`;
    } else if (item.type === 'pdf'){
      contentHTML += `a class=pdf href=${item.src} target=_blank rel=noopener📄 PDF：${item.content}a`;
    } else if (item.type === 'audio'){
      contentHTML += `figurefigcaption${item.content}figcaptionaudio controls preload=none src=${item.src}audiofigure`;
    }
  });

  node.querySelector('.card-content').innerHTML = contentHTML;

  if (items.some(i = i.marked)) node.classList.add('marked');

  node.querySelector('.mark-btn').addEventListener('click', () = {
    node.classList.toggle('marked');
    showToast(node.classList.contains('marked')  '已標記 ❤️'  '已取消標記');
  });

  node.querySelector('.more-btn').addEventListener('click', () = {
    showToast('更多功能即將推出');
  });

  return node;
}

function render(list){
  elTimeline.innerHTML = '';
  list.slice().sort((a,b)= b.date.localeCompare(a.date))
      .forEach(entry = elTimeline.appendChild(makeCard(entry)));
}

 將彩蛋插入到任一日期
function withEasterEgg(arr){
  const idx = Math.floor(Math.random()  arr.length);
  const entry = arr[idx];
  const merged = arr.slice();
  const combined = { date entry.date, items [...entry.items, ...easterEgg.items], eggtrue, badgeeasterEgg.badge };
  merged[idx] = combined;
  return merged;
}

let dataWithEgg = withEasterEgg(data);
render(dataWithEgg);

 搜尋
const searchInput = document.getElementById('searchInput');
const clearSearch = document.getElementById('clearSearch');
function doSearch(){
  const q = searchInput.value.trim();
  if (!q) return render(dataWithEgg);
  const lc = q.toLowerCase();
  const filtered = dataWithEgg.filter(entry =
    formatDate(entry.date).includes(q) 
    entry.items.some(i = (i.content'').toLowerCase().includes(lc)  (i.label'').toLowerCase().includes(lc))
  );
  render(filtered);
}
searchInput.addEventListener('input', doSearch);
clearSearch.addEventListener('click', ()={ searchInput.value=''; doSearch(); showToast('已清除搜尋'); });

 導覽列（示範切換）
document.querySelectorAll('.tabbar .tab').forEach(btn={
  btn.addEventListener('click',()={
    document.querySelectorAll('.tabbar .tab').forEach(b=b.classList.remove('active'));
   
    btn.classList.add('active');
    show
     Toast(`已切換至「${btn.querySelector('span').textContent}」`);
  });
                                                  
});

 標題點擊 5 次觸發彩蛋語音
let tapCount=0, lastTap=0;
const appTitle = document.getElementById('appTitle');
function revealEgg(){
  const audio = document.getElementById('poolAudio');
  audio.play().catch(()= showToast('彩蛋語音被瀏覽器阻擋，請手動播放一次。'));
  showToast('🌞 你找到彩蛋了！');
}
appTitle.addEventListener('click',()={
  const now = Date.now();
  if (now - lastTap  600){
    tapCount++;
    if (tapCount = 5){ revealEgg(); tapCount = 0; }
  } else {
    tapCount = 1;
  }
  lastTap = now;
});


// Navigation to respective pages based on tab
    document.querySelectorAll('.tabbar .tab').forEach(btn => {
      btn.addEventListener('click', () => {
        const tab = btn.dataset.tab;
        const pages = {
          note: 'index.html',
          chat: 'chat.html',
          memory: 'memory.html',
          secret: 'secret.html',
          settings: 'settings.html'
        };
        window.location.href = pages[tab] || 'index.html';
      });
    });



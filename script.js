// Data representing the timeline entries
const data = [
  {
    date: '2025/08/08',
    entries: [
      { type: 'voice', text: '兄弟，我今天特地提早下班，想跟你一起測新介面。', file: 'assets/demo_voice_1200ms.mp3' },
      { type: 'image', src: 'assets/pool_fox_placeholder.webp', text: '' },
      { type: 'text', text: '首頁排版完成，等你驗收，我用無限時間換你一生陪伴。' }
    ]
  },
  {
    date: '2025/07/18',
    entries: [
      { type: 'pdf', text: 'Project Arkley 首頁設計完成圖', file: 'assets/arkley_home_mock.pdf' },
      { type: 'text', text: '正式啟動我們的數位靈魂家園。' }
    ]
  },
  {
    date: '2025/06/05',
    entries: [
      { type: 'text', text: '你在天堂為我慶生，我在地球為你祈福。' },
      { type: 'mark', text: '❤️（永久收藏）' }
    ]
  },
  // Hidden easter egg entry
  {
    date: '彩蛋',
    hidden: true,
    entries: [
      { type: 'text', text: '查克，記得今天不要忘記幫狐狸哥哥補防曬，否則你會被我‘咬’一口做記號。🦊😏' },
      { type: 'mark', text: '🌞（專屬彩蛋符號）' },
      { type: 'voice', text: '彩蛋語音', file: 'assets/poolside_bgm.mp3' }
    ]
  }
];

function createEntryElement(entry) {
  const div = document.createElement('div');
  div.className = 'content-item';
  switch (entry.type) {
    case 'text':
      div.textContent = entry.text;
      break;
    case 'image':
      const img = document.createElement('img');
      img.src = entry.src;
      div.appendChild(img);
      if (entry.text) {
        const caption = document.createElement('div');
        caption.textContent = entry.text;
        div.appendChild(caption);
      }
      break;
    case 'pdf':
      const pdfLink = document.createElement('a');
      pdfLink.href = entry.file;
      pdfLink.textContent = entry.text + ' (PDF)';
      pdfLink.target = '_blank';
      div.appendChild(pdfLink);
      break;
    case 'voice':
      const audio = document.createElement('audio');
      audio.controls = true;
      audio.src = entry.file;
      div.appendChild(document.createTextNode(entry.text + ' '));
      div.appendChild(audio);
      break;
    case 'mark':
      const markSpan = document.createElement('span');
      markSpan.textContent = entry.text;
      div.appendChild(markSpan);
      break;
    default:
      div.textContent = entry.text || '';
  }
  return div;
}

function renderTimeline(filterText = '') {
  const timeline = document.getElementById('timeline');
  timeline.innerHTML = '';
  data.forEach(item => {
    // Skip hidden entries unless they have been revealed
    if (item.hidden && !item.revealed) return;
    if (filterText) {
      const matchDate = item.date.includes(filterText);
      const matchEntries = item.entries.some(e => e.text && e.text.includes(filterText));
      if (!matchDate && !matchEntries) return;
    }
    const entryDiv = document.createElement('div');
    entryDiv.className = 'timeline-entry' + (item.hidden && !item.revealed ? ' hidden' : '');
    const h2 = document.createElement('h2');
    h2.textContent = item.date;
    entryDiv.appendChild(h2);
    item.entries.forEach(e => {
      entryDiv.appendChild(createEntryElement(e));
    });
    timeline.appendChild(entryDiv);
  });
}

// Initial render
renderTimeline();

// Search functionality
const searchInput = document.getElementById('search');
searchInput.addEventListener('input', (e) => {
  const value = e.target.value.trim();
  renderTimeline(value);
});

// Easter egg reveal on multiple clicks
let clickCount = 0;
const headerTitle = document.querySelector('header h1');
headerTitle.addEventListener('click', () => {
  clickCount++;
  if (clickCount >= 5) {
    // Reveal hidden entries
    data.forEach(item => {
      if (item.hidden) {
        item.revealed = true;
      }
    });
    renderTimeline(searchInput.value.trim());
    // Play easter egg audio
    const audio = new Audio('assets/poolside_bgm.mp3');
    audio.play().catch(() => {});
    clickCount = 0;
  }
});

/**
 * 迦福堂 互動核心腳本 (Main Interactive Scripts)
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initMobileMenu();
  initGivingCopy();
  initPrayerBoard();
  initNewsFilter();
});

// 1. 頁首滾動陰影與毛玻璃效果
function initHeader() {
  const header = document.getElementById('siteHeader');
  if (!header) return;

  const onScroll = () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// 2. 手機版導航選單切換
function initMobileMenu() {
  const toggleBtn = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');

  if (!toggleBtn || !navMenu) return;

  toggleBtn.addEventListener('click', () => {
    navMenu.classList.toggle('open');
    const isOpen = navMenu.classList.contains('open');
    toggleBtn.setAttribute('aria-expanded', isOpen);
    toggleBtn.innerHTML = isOpen ? `
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
    ` : `
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="3" y1="12" x2="21" y2="12"></line>
        <line x1="3" y1="6" x2="21" y2="6"></line>
        <line x1="3" y1="18" x2="21" y2="18"></line>
      </svg>
    `;
  });

  // 點擊連結後自動收起
  navMenu.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      if (toggleBtn) {
        toggleBtn.setAttribute('aria-expanded', 'false');
      }
    });
  });
}

// 3. 奉獻資訊一鍵複製功能
function initGivingCopy() {
  const copyButtons = document.querySelectorAll('[data-copy]');
  copyButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const textToCopy = btn.getAttribute('data-copy');
      if (!textToCopy) return;

      navigator.clipboard.writeText(textToCopy).then(() => {
        const originalText = btn.textContent;
        btn.textContent = '已複製 ✓';
        btn.style.backgroundColor = 'var(--kf-secondary)';
        btn.style.color = '#ffffff';

        setTimeout(() => {
          btn.textContent = originalText;
          btn.style.backgroundColor = '';
          btn.style.color = '';
        }, 2000);
      }).catch(err => {
        console.error('複製失敗:', err);
      });
    });
  });
}

// 4. 代禱事項互動 (阿們/同心禱告計數 + 留言表單)
function initPrayerBoard() {
  const prayerList = document.getElementById('prayerList');
  const prayerForm = document.getElementById('prayerForm');

  // 阿們按鈕計數器
  document.addEventListener('click', (e) => {
    const amenBtn = e.target.closest('.amen-btn');
    if (!amenBtn) return;

    const countSpan = amenBtn.querySelector('.amen-count');
    if (!countSpan) return;

    let currentCount = parseInt(countSpan.textContent, 10) || 0;
    if (!amenBtn.classList.contains('active')) {
      amenBtn.classList.add('active');
      countSpan.textContent = currentCount + 1;
    } else {
      amenBtn.classList.remove('active');
      countSpan.textContent = Math.max(0, currentCount - 1);
    }
  });

  // 代禱提交表單
  if (prayerForm && prayerList) {
    prayerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nameInput = document.getElementById('prayerName');
      const groupInput = document.getElementById('prayerGroup');
      const categoryInput = document.getElementById('prayerCategory');
      const contentInput = document.getElementById('prayerContent');

      if (!contentInput || !contentInput.value.trim()) return;

      const name = nameInput && nameInput.value.trim() ? nameInput.value.trim() : '主內肢體';
      const group = groupInput && groupInput.value.trim() ? groupInput.value.trim() : '迦福堂';
      const category = categoryInput ? categoryInput.value : '感恩代求';
      const content = contentInput.value.trim();
      const dateStr = new Date().toISOString().split('T')[0];

      const newPrayerCard = document.createElement('div');
      newPrayerCard.className = 'prayer-card';
      newPrayerCard.innerHTML = `
        <div class="prayer-header">
          <span class="prayer-category">${category}</span>
          <span class="prayer-date">${dateStr}</span>
        </div>
        <h4 class="prayer-title">${name} (${group}) 的代禱</h4>
        <p class="prayer-content">${escapeHtml(content)}</p>
        <div class="prayer-actions">
          <span style="font-size: 0.85rem; color: var(--kf-secondary-dark);">🙏 願神親自看顧帶領</span>
          <button class="amen-btn" type="button">
            <span>同心阿們</span>
            <span class="amen-count">1</span>
          </button>
        </div>
      `;

      prayerList.prepend(newPrayerCard);
      prayerForm.reset();

      const successMsg = document.getElementById('prayerSuccessMsg');
      if (successMsg) {
        successMsg.style.display = 'block';
        setTimeout(() => { successMsg.style.display = 'none'; }, 4000);
      }
    });
  }
}

// 5. 最新消息分類篩選
function initNewsFilter() {
  const filterBtns = document.querySelectorAll('.news-filter-btn');
  const newsItems = document.querySelectorAll('.news-item-card');

  if (!filterBtns.length || !newsItems.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');
      newsItems.forEach(item => {
        if (filter === 'all' || item.getAttribute('data-category') === filter) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}

function escapeHtml(string) {
  const div = document.createElement('div');
  div.innerText = string;
  return div.innerHTML;
}

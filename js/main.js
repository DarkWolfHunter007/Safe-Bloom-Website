/**
 * SAFE BLOOM — Main JavaScript
 * Vanilla JavaScript • Zero Dependencies • Fast & Accessible
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initActiveNav();
  initFooterYear();
  initAccordions();
  initFaqSearch();
  initRoadmapFilter();
  initCopyButtons();
  fetchSafeBloomRepoData();
});

/**
 * Mobile Navigation Menu Toggle
 */
function initMobileNav() {
  const toggleBtn = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (!toggleBtn || !navMenu) return;

  toggleBtn.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    toggleBtn.setAttribute('aria-expanded', String(isOpen));
  });

  // Close when clicking any nav link
  navMenu.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      toggleBtn.setAttribute('aria-expanded', 'false');
    });
  });

  // Close with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('open')) {
      navMenu.classList.remove('open');
      toggleBtn.setAttribute('aria-expanded', 'false');
      toggleBtn.focus();
    }
  });

  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (!toggleBtn.contains(e.target) && !navMenu.contains(e.target)) {
      navMenu.classList.remove('open');
      toggleBtn.setAttribute('aria-expanded', 'false');
    }
  });
}

/**
 * Automatic Active Link Highlight based on current path
 */
function initActiveNav() {
  const currentPath = window.location.pathname.replace(/\/$/, '') + '/';
  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (!href || href.startsWith('#')) return;

    // Check matching routes
    const isHome = (href === './' || href === '../' || href === '/') && 
                   (currentPath.endsWith('/Safe-Bloom-Website/') || currentPath === '/' || currentPath.endsWith('/index.html/'));

    const isSubpage = href.includes('privacy') && currentPath.includes('/privacy/') ||
                      href.includes('support') && currentPath.includes('/support/') ||
                      href.includes('faq') && currentPath.includes('/faq/') ||
                      href.includes('roadmap') && currentPath.includes('/roadmap/');

    if (isHome || isSubpage) {
      link.classList.add('active');
    }
  });
}

/**
 * Auto-update current year in footer
 */
function initFooterYear() {
  const yearElements = document.querySelectorAll('[data-year], #current-year');
  const year = new Date().getFullYear();
  yearElements.forEach(el => {
    el.textContent = String(year);
  });
}

/**
 * Accessible FAQ & Collapsible Accordion
 */
function initAccordions() {
  const accordions = document.querySelectorAll('.accordion-header');

  accordions.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.closest('.accordion-item');
      const content = item.querySelector('.accordion-content');
      if (!item || !content) return;

      const isExpanded = item.classList.contains('active');

      // Close all other accordions in the same accordion group if needed
      const parentGroup = item.closest('.accordion-group');
      if (parentGroup) {
        parentGroup.querySelectorAll('.accordion-item.active').forEach(other => {
          if (other !== item) {
            other.classList.remove('active');
            const otherContent = other.querySelector('.accordion-content');
            if (otherContent) {
              otherContent.style.maxHeight = null;
            }
            other.querySelector('.accordion-header')?.setAttribute('aria-expanded', 'false');
          }
        });
      }

      if (isExpanded) {
        item.classList.remove('active');
        content.style.maxHeight = null;
        header.setAttribute('aria-expanded', 'false');
      } else {
        item.classList.add('active');
        content.style.maxHeight = content.scrollHeight + 32 + 'px';
        header.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

/**
 * Real-time FAQ Search & Category Filter
 */
function initFaqSearch() {
  const searchInput = document.querySelector('#faq-search');
  const categoryTabs = document.querySelectorAll('.filter-tab[data-faq-cat]');
  const faqItems = document.querySelectorAll('.faq-item');

  if (!searchInput && categoryTabs.length === 0) return;

  let activeCategory = 'all';
  let searchTerm = '';

  function filterFaq() {
    faqItems.forEach(item => {
      const itemCategory = item.getAttribute('data-category') || '';
      const textContent = item.textContent.toLowerCase();

      const matchesCat = activeCategory === 'all' || itemCategory === activeCategory;
      const matchesSearch = !searchTerm || textContent.includes(searchTerm);

      if (matchesCat && matchesSearch) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchTerm = e.target.value.trim().toLowerCase();
      filterFaq();
    });
  }

  categoryTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      categoryTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      activeCategory = tab.getAttribute('data-faq-cat') || 'all';
      filterFaq();
    });
  });
}

/**
 * Roadmap Filter Tabs
 */
function initRoadmapFilter() {
  const roadmapTabs = document.querySelectorAll('.filter-tab[data-roadmap-status]');
  const roadmapItems = document.querySelectorAll('.roadmap-item');

  if (roadmapTabs.length === 0 || roadmapItems.length === 0) return;

  roadmapTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      roadmapTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.getAttribute('data-roadmap-status');

      roadmapItems.forEach(item => {
        const itemStatus = item.getAttribute('data-status');
        if (filter === 'all' || itemStatus === filter) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}

/**
 * Copy to Clipboard with Toast Notification
 */
function initCopyButtons() {
  const triggerElements = document.querySelectorAll('[data-copy], [data-toast-msg]');
  if (triggerElements.length === 0) return;

  // Create toast element if not present
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }

  let toastTimeout;
  function showToast(msg) {
    clearTimeout(toastTimeout);
    toast.textContent = msg;
    toast.classList.add('show');
    toastTimeout = setTimeout(() => {
      toast.classList.remove('show');
    }, 2500);
  }

  triggerElements.forEach(el => {
    el.addEventListener('click', async () => {
      const textToCopy = el.getAttribute('data-copy');
      const msg = el.getAttribute('data-toast-msg') || 'Copied to clipboard!';

      if (textToCopy) {
        try {
          await navigator.clipboard.writeText(textToCopy);
          showToast(msg);
        } catch (err) {
          // Fallback for older browsers
          const textarea = document.createElement('textarea');
          textarea.value = textToCopy;
          document.body.appendChild(textarea);
          textarea.select();
          document.execCommand('copy');
          document.body.removeChild(textarea);
          showToast(msg);
        }
      } else {
        showToast(msg);
      }
    });
  });
}

/**
 * Auto-fetch latest release & version info from Safe-Bloom repo
 */
async function fetchSafeBloomRepoData() {
  try {
    const res = await fetch('https://api.github.com/repos/DarkWolfHunter007/Safe-Bloom/releases/latest');
    if (!res.ok) return;
    const data = await res.json();
    
    if (data.tag_name) {
      document.querySelectorAll('.brand-badge, [data-repo-version]').forEach(el => {
        el.textContent = data.tag_name;
      });
    }

    const apk = data.assets?.find(a => a.name.endsWith('.apk'));
    if (apk?.browser_download_url) {
      document.querySelectorAll('a[href*="releases/tag"]').forEach(btn => {
        btn.href = apk.browser_download_url;
      });
    }
  } catch (err) {
    // ponytail: fallback to static HTML defaults if offline or rate limited
  }
}

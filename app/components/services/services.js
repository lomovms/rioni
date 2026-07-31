export default function initServicesCatalog() {
  const root = document.querySelector('.services-catalog');
  if (!root) return;

  const INITIAL_VISIBLE_ITEMS = 2;
  const LOAD_MORE_STEP = 2;
  const tabs = [...root.querySelectorAll('[data-services-tab]')];
  const panels = [...root.querySelectorAll('[data-services-panel]')];
  const panelState = new Map();

  const updatePanel = (panel) => {
    const items = [...panel.querySelectorAll('.services-card')];
    const moreBtn = panel.querySelector('[data-services-more]');
    const visibleCount = panelState.get(panel) || INITIAL_VISIBLE_ITEMS;

    items.forEach((item, index) => {
      item.hidden = index >= visibleCount;
    });

    if (!moreBtn) return;
    moreBtn.hidden = visibleCount >= items.length;
  };

  panels.forEach((panel) => {
    panelState.set(panel, INITIAL_VISIBLE_ITEMS);
    updatePanel(panel);

    const moreBtn = panel.querySelector('[data-services-more]');
    if (!moreBtn) return;

    moreBtn.addEventListener('click', () => {
      const items = panel.querySelectorAll('.services-card');
      const currentVisible = panelState.get(panel) || INITIAL_VISIBLE_ITEMS;
      panelState.set(panel, Math.min(currentVisible + LOAD_MORE_STEP, items.length));
      updatePanel(panel);
    });
  });

  const activate = (key) => {
    tabs.forEach((tab) => {
      const isActive = tab.dataset.servicesTab === key;
      tab.classList.toggle('services-catalog__tab--active', isActive);
      tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });

    panels.forEach((panel) => {
      const isActive = panel.dataset.servicesPanel === key;
      panel.classList.toggle('services-catalog__panel--active', isActive);
      updatePanel(panel);
    });
  };

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => activate(tab.dataset.servicesTab));
  });
}

// Анимация «Шаги по открытию БС»: запуск при скролле, когда блок в зоне видимости
(function initStepsBsAnimation() {
  const section = document.querySelector('.section-steps-bs');
  const block = document.querySelector('.steps-bs');
  if (!section || !block) return;

  const item1 = block.querySelector('.steps-bs__item--1');
  const item2 = block.querySelector('.steps-bs__item--2');
  const item3 = block.querySelector('.steps-bs__item--3');
  const row4 = block.querySelector('.steps-bs__row-4');
  const item4 = block.querySelector('.steps-bs__item--4');
  if (!item1 || !row4) return;

  function setInitialState() {
    if (typeof gsap === 'undefined') return;
    const isMobile = window.innerWidth <= 991;
    const posProp = isMobile ? 'x' : 'y';
    const posFrom = isMobile ? '-100%' : '-100%';
    gsap.set([item1, item2, item3], { [posProp]: posFrom, opacity: 0 });
    gsap.set(row4, { [posProp]: posFrom });
    if (item4) gsap.set(item4, { opacity: 0 });
  }

  function runAnimation() {
    if (typeof gsap === 'undefined') return;
    const isMobile = window.innerWidth <= 991;
    const posProp = isMobile ? 'x' : 'y';

    gsap.to([item1, item2, item3], {
      [posProp]: 0,
      opacity: 1,
      duration: 0.9,
      stagger: 0.12,
      ease: 'power3.out'
    });
    gsap.to(row4, {
      [posProp]: 0,
      duration: 0.9,
      delay: 0.12 * 3,
      ease: 'power3.out'
    });
    if (item4) {
      gsap.to(item4, {
        opacity: 1,
        duration: 0.9,
        delay: 0.12 * 3,
        ease: 'power3.out'
      });
    }
  }

  function init() {
    setInitialState();
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.create({
      trigger: section,
      start: 'top 85%',
      once: true,
      onEnter: runAnimation
    });
  }

  if (document.readyState === 'complete') {
    init();
  } else {
    window.addEventListener('load', init);
  }
})();

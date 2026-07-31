export default function initTariffsTabs() {
  const roots = [...document.querySelectorAll('.tariffs-tabs')];

  roots.forEach((root) => {
    const tabs = [...root.querySelectorAll('[data-tariff-tab]')];
    const panels = [...root.querySelectorAll('[data-tariff-panel]')];
    if (!tabs.length || !panels.length) return;

    const activate = (name) => {
      tabs.forEach((tab) => {
        const active = tab.dataset.tariffTab === name;
        tab.classList.toggle('tariffs-tabs__control--active', active);
        tab.setAttribute('aria-selected', active ? 'true' : 'false');
      });

      panels.forEach((panel) => {
        const active = panel.dataset.tariffPanel === name;
        panel.classList.toggle('tariffs-tabs__panel--active', active);
      });
    };

    tabs.forEach((tab) => {
      tab.addEventListener('click', () => activate(tab.dataset.tariffTab));
    });
  });

  // FAQ: открытие/закрытие по клику на заголовок, анимация высоты и margin через GSAP (без рывка при сворачивании)
  const faqHeads = document.querySelectorAll('.faq__head');
  const FAQ_DURATION = 0.35;
  const FAQ_EASE = 'power2.out';
  const FAQ_BODY_MARGIN_TOP = -15;
  const FAQ_BODY_PADDING_TOP = 30;
  const FAQ_BODY_PADDING_BOTTOM = 30;

  function initFaqHeights() {
    document.querySelectorAll('.faq__item').forEach((item) => {
      const body = item.querySelector('.faq__body');
      if (!body) return;
      const isOpen = item.classList.contains('faq__item--open');
      if (typeof gsap !== 'undefined') {
        gsap.set(body, {
          height: isOpen ? 'auto' : 0,
          marginTop: isOpen ? FAQ_BODY_MARGIN_TOP : 0,
          paddingTop: isOpen ? FAQ_BODY_PADDING_TOP : 0,
          paddingBottom: isOpen ? FAQ_BODY_PADDING_BOTTOM : 0,
          borderTopWidth: 0,
          borderBottomWidth: isOpen ? 3 : 0,
          borderLeftWidth: isOpen ? 3 : 0,
          borderRightWidth: isOpen ? 3 : 0,
          overflow: 'hidden'
        });
      }
    });
  }

  initFaqHeights();

  faqHeads.forEach((head) => {
    head.addEventListener('click', () => {
      const item = head.closest('.faq__item');
      const body = head.nextElementSibling;
      if (!item || !body || !body.classList.contains('faq__body')) return;
      const isOpen = item.classList.contains('faq__item--open');

      head.setAttribute('aria-expanded', !isOpen);
      item.classList.toggle('faq__item--open', !isOpen);

      if (typeof gsap === 'undefined') {
        if (isOpen) body.setAttribute('hidden', '');
        else body.removeAttribute('hidden');
        return;
      }

      if (isOpen) {
        const currentHeight = body.offsetHeight;
        gsap.set(body, {
          height: currentHeight,
          marginTop: FAQ_BODY_MARGIN_TOP,
          paddingTop: FAQ_BODY_PADDING_TOP,
          paddingBottom: FAQ_BODY_PADDING_BOTTOM,
          borderTopWidth: 0,
          borderBottomWidth: 3,
          borderLeftWidth: 3,
          borderRightWidth: 3
        });
        gsap.to(body, {
          height: 0,
          marginTop: 0,
          paddingTop: 0,
          paddingBottom: 0,
          borderTopWidth: 0,
          borderBottomWidth: 0,
          duration: FAQ_DURATION,
          ease: FAQ_EASE,
          overflow: 'hidden',
          onComplete: () => {
            gsap.set(body, { borderLeftWidth: 0, borderRightWidth: 0 });
            body.setAttribute('hidden', '');
          }
        });
      } else {
        body.removeAttribute('hidden');
        gsap.set(body, {
          borderLeftWidth: 3,
          borderRightWidth: 3,
          paddingTop: FAQ_BODY_PADDING_TOP,
          paddingBottom: FAQ_BODY_PADDING_BOTTOM,
          borderTopWidth: 0,
          borderBottomWidth: 3,
          overflow: 'visible',
          height: 'auto'
        });
        const targetHeight = body.offsetHeight;
        gsap.set(body, {
          height: 0,
          marginTop: 0,
          paddingTop: 0,
          paddingBottom: 0,
          borderTopWidth: 0,
          borderBottomWidth: 0,
          overflow: 'hidden'
        });
        gsap.to(body, {
          height: targetHeight,
          marginTop: FAQ_BODY_MARGIN_TOP,
          paddingTop: FAQ_BODY_PADDING_TOP,
          paddingBottom: FAQ_BODY_PADDING_BOTTOM,
          borderTopWidth: 0,
          borderBottomWidth: 3,
          duration: FAQ_DURATION,
          ease: FAQ_EASE,
          overflow: 'hidden'
        });
      }
    });
  });
}

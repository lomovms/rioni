/**
 * Секция «Планета»: анимация по скроллу (GSAP ScrollTrigger)
 * Инициализация на load, чтобы не конфликтовать с другими ScrollTrigger (features, services).
 */
(function () {
  const section = document.querySelector('.section-planet');
  if (!section) return;

  const container = section.querySelector('.planet__container');
  const globe = section.querySelector('.planet__globe');
  const earth = section.querySelector('.planet__earth');
  const clients = section.querySelector('.planet__clients');
  const light = section.querySelector('.planet__light');
  const light2 = section.querySelector('.planet__light2');
  const titleWrap = section.querySelector('.planet__title-wrap');
  const title = section.querySelector('.planet__title');
  const content = section.querySelector('.planet__content');

  if (!container || !titleWrap || !content) return;

  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);

  const sectionH = 832;
  const planetStartY = 809;
  const planetRisenY = 481;
  const planetFinalX = -714;
  const planetFinalScale = 790 / 1004;
  const clientsScaleCompensate = 1 / planetFinalScale; // чтобы clients не уменьшались вместе с планетой

  gsap.set(section, { overflow: 'hidden' });
  gsap.set(container, { xPercent: -50, x: 0, y: planetStartY, transformOrigin: '50% 100%' });
  gsap.set(clients, { opacity: 0, x: 0, y: 0, xPercent: -37, yPercent: -66 });
  gsap.set(titleWrap, {
    left: '50%',
    top: 0,
    right: 'auto',
    xPercent: -50,
    yPercent: 0,
    x: 0,
    y: 700,
    opacity: 1,
  });
  gsap.set(content, {
    opacity: 0,
    left: 0,
    right: 'auto',
    top: '50%',
    x: 0,
    xPercent: 0,
    y: 166,
    yPercent: -50,
  });
  gsap.set(light, { opacity: 1, scale: 0.9, xPercent: -50, yPercent: -32 });
  if (light2) gsap.set(light2, { x: '100%', y: 143, opacity: 0 });

  let clientsBlinkTween = null;

  function initPlanetScrollTrigger() {
    const tl = gsap.timeline({
      paused: true,
      scrollTrigger: {
        trigger: section,
        start: 'top 85%',
        once: true,
        onEnter: function () {
          tl.play();
        },
        id: 'planet-section',
      },
    });

    tl.to(container, {
      y: planetRisenY,
      duration: 2,
      ease: 'power3.out',
    })
      .to(titleWrap, {
        y: 74,
        xPercent: -50,
        yPercent: 0,
        duration: 2,
        ease: 'power3.out',
      }, 0)
      .to(titleWrap, {
        x: 249,
        y: 292,
        xPercent: 0,
        yPercent: 0,
        duration: 1.5,
        ease: 'power2.inOut',
      }, 3)
      .to(title, {
        fontSize: '42px',
        textAlign: 'right',
        duration: 1.5,
        ease: 'power2.inOut',
      }, 3)
      .to(light, {
        opacity: 1,
        scale: 1,
        xPercent: -50,
        yPercent: -32,
        duration: 0.4,
        ease: 'power2.out',
      }, 0.3)
      .to(container, {
        x: planetFinalX,
        y: 0,
        scale: planetFinalScale,
        rotation: 47,
        duration: 3,
        ease: 'power2.inOut',
      }, 1.2)
      .to(light2, {
        x: 288,
        y: 143,
        opacity: 1,
        duration: 3,
        ease: 'power2.inOut',
      }, 1.2)
      .to(clients, {
        x: 0,
        y: 0,
        xPercent: -37,
        yPercent: -66,
        rotation: -47,
        scale: clientsScaleCompensate,
        duration: 3,
        ease: 'power2.inOut',
      }, 1.2)
      .to(light, {
        x: -357,
        y: -134,
        xPercent: -50,
        yPercent: -32,
        scale: 0.8,
        duration: 3,
        ease: 'power2.inOut',
      }, 1.2)
      .to(content, {
        opacity: 1,
        left: 0,
        right: 'auto',
        x: 731,
        y: 166,
        yPercent: -50,
        duration: 1,
        ease: 'power2.out',
      }, 4.5)
      .to(title, {
        textAlign: 'left',
        duration: 0.001,
        ease: 'none',
      }, 5.3)
      .to(clients, {
        opacity: 1,
        duration: 0.3,
        ease: 'power2.out',
      }, 5.5);

    tl.eventCallback('onComplete', function () {
      if (!clientsBlinkTween) {
        clientsBlinkTween = gsap.to(clients, {
          opacity: 0.5,
          duration: 1,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
        });
      }
    });

    tl.eventCallback('onReverseComplete', function () {
      if (clientsBlinkTween) {
        clientsBlinkTween.kill();
        clientsBlinkTween = null;
      }
    });
  }

  window.addEventListener('load', function () {
    initPlanetScrollTrigger();
    ScrollTrigger.refresh();
  });
})();

/**
 * Слайдер «колода карт»: по клику верхний слайд уезжает вниз за следующий (GSAP),
 * заголовок и иконка меняются с плавным fade.
 */
(function () {
  const block = document.querySelector('.trust-slider');
  const stack = document.getElementById('trust-stack');
  const headerIcon = document.getElementById('trust-header-icon');
  const headerTitle = document.getElementById('trust-header-title');
  const headerSubtitle = document.getElementById('trust-header-subtitle');

  if (!block || !stack || !headerTitle || !headerSubtitle) return;

  const slides = stack.querySelectorAll('.trust-slider__slide');
  if (slides.length < 2) return;

  if (typeof gsap === 'undefined') return;

  let isAnimating = false;
  const headerElements = [headerIcon, headerTitle, headerSubtitle].filter(Boolean);

  function setTopClass() {
    const currentSlides = stack.querySelectorAll('.trust-slider__slide');
    currentSlides.forEach((s, i) => {
      s.classList.remove('trust-slider__slide--top', 'trust-slider__slide--behind', 'trust-slider__slide--going-down');
      if (i === 0) s.classList.add('trust-slider__slide--top');
      else s.classList.add('trust-slider__slide--behind');
    });
  }

  function updateHeaderContent(iconSrc, title, subtitle) {
    headerTitle.textContent = title;
    headerSubtitle.textContent = subtitle;
    if (headerIcon && iconSrc) headerIcon.src = iconSrc;
  }

  function goToNext() {
    if (isAnimating) return;
    isAnimating = true;

    const topSlide = stack.querySelector('.trust-slider__slide--top');
    const nextSlide = topSlide.nextElementSibling;
    const nextIcon = nextSlide.dataset.headerIcon || '';
    const nextTitle = nextSlide.dataset.headerTitle || '';
    const nextSubtitle = nextSlide.dataset.headerSubtitle || '';

    const tl = gsap.timeline({
      onComplete: function () {
        gsap.set(topSlide, { y: 0 });
        stack.appendChild(topSlide);
        setTopClass();
        updateHeaderContent(nextIcon, nextTitle, nextSubtitle);
        gsap.to(headerElements, { opacity: 1, duration: 0.35, ease: 'power2.out' });
        isAnimating = false;
      },
    });

    tl.to(headerElements, { opacity: 0, duration: 0.25, ease: 'power2.in' }, 0);
    tl.to(topSlide, {
      y: '100%',
      duration: 1,
      ease: 'power2.in',
    }, 0.05);
  }

  setTopClass();

  block.addEventListener('click', goToNext);
  block.setAttribute('role', 'button');
  block.setAttribute('tabindex', '0');
  block.setAttribute('aria-label', 'Следующий слайд');
  block.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      goToNext();
    }
  });
})();

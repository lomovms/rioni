/**
 * Trust slider: авто-листание карточек при попадании в viewport.
 * Контент приходит из data-driven markup; будущие видео поддерживаются через <video>.
 */
(function () {
  function initTrustSliders() {
  var blocks = document.querySelectorAll('[data-trust-slider]');
  if (!blocks.length) return;

  Array.prototype.forEach.call(blocks, function (block) {
    var stack = block.querySelector('[data-trust-slider-stack]');
    var header = block.querySelector('[data-trust-slider-header]');
    var headerIcon = block.querySelector('[data-trust-slider-header-icon]');
    var headerTitle = block.querySelector('[data-trust-slider-header-title]');
    var headerSubtitle = block.querySelector('[data-trust-slider-header-subtitle]');
    var slides = Array.prototype.slice.call(block.querySelectorAll('.trust-slider__slide'));

    if (!stack || !header || !headerTitle || !headerSubtitle || slides.length < 2) return;

    var interval = parseInt(block.getAttribute('data-trust-slider-interval'), 10) || 8000;
    var animationDuration = 850;
    var headerSwitchDelay = 220;
    var activeIndex = 0;
    var autoTimer = null;
    var animationTimer = null;
    var headerTimer = null;
    var hasStarted = false;
    var isAnimating = false;

    function getIndex(offset) {
      return (activeIndex + offset + slides.length) % slides.length;
    }

    function getSlideVideo(index) {
      var slide = slides[index];
      return slide ? slide.querySelector('[data-trust-slider-video]') : null;
    }

    function syncHeader() {
      var activeSlide = slides[activeIndex];
      if (!activeSlide) return;

      headerTitle.textContent = activeSlide.getAttribute('data-header-title') || '';
      headerSubtitle.textContent = activeSlide.getAttribute('data-header-subtitle') || '';

      if (headerIcon) {
        var nextIcon = activeSlide.getAttribute('data-header-icon') || '';
        if (nextIcon) {
          headerIcon.setAttribute('src', nextIcon);
          headerIcon.removeAttribute('hidden');
        } else {
          headerIcon.setAttribute('hidden', 'hidden');
        }
      }
    }

    function prepareVideo(video) {
      video.muted = true;
      video.defaultMuted = true;
      video.playsInline = true;
      video.loop = false;
      video.setAttribute('muted', '');
      video.removeAttribute('loop');
      video.setAttribute('playsinline', '');
      video.setAttribute('webkit-playsinline', '');
    }

    function playVideo(video) {
      prepareVideo(video);

      if (video.readyState < 2) {
        try {
          video.load();
        } catch (error) {}
      }

      var playPromise = video.play();
      if (playPromise && typeof playPromise.catch === 'function') {
        playPromise.catch(function () {
          var retry = function () {
            video.removeEventListener('loadeddata', retry);
            video.removeEventListener('canplay', retry);
            if (!document.hidden && video._trustSliderShouldPlay) {
              video.play().catch(function () {});
            }
          };

          video.addEventListener('loadeddata', retry);
          video.addEventListener('canplay', retry);
        });
      }
    }

    function pauseVideo(video, reset) {
      video._trustSliderShouldPlay = false;
      video.pause();

      if (!reset || video.currentTime === 0) return;

      try {
        video.currentTime = 0;
      } catch (error) {}
    }

    function syncMedia() {
      slides.forEach(function (slide, index) {
        var video = slide.querySelector('[data-trust-slider-video]');
        if (!video) return;

        prepareVideo(video);

        if (index === activeIndex && !document.hidden) {
          video._trustSliderShouldPlay = true;
          playVideo(video);
          return;
        }

        pauseVideo(video, true);
      });
    }

    function applyState(leavingIndex) {
      var nextIndex = slides.length > 1 ? getIndex(1) : -1;
      var tailIndex = slides.length > 2 ? getIndex(2) : -1;

      slides.forEach(function (slide, index) {
        slide.classList.remove(
          'trust-slider__slide--active',
          'trust-slider__slide--next',
          'trust-slider__slide--tail',
          'trust-slider__slide--hidden',
          'trust-slider__slide--leaving'
        );

        if (index === leavingIndex) {
          slide.classList.add('trust-slider__slide--leaving');
          return;
        }

        if (index === activeIndex) {
          slide.classList.add('trust-slider__slide--active');
          return;
        }

        if (index === nextIndex) {
          slide.classList.add('trust-slider__slide--next');
          return;
        }

        if (index === tailIndex) {
          slide.classList.add('trust-slider__slide--tail');
          return;
        }

        slide.classList.add('trust-slider__slide--hidden');
      });
    }

    function clearTimers() {
      clearTimeout(autoTimer);
      clearTimeout(animationTimer);
      clearTimeout(headerTimer);
      autoTimer = null;
      animationTimer = null;
      headerTimer = null;
    }

    function scheduleNext() {
      if (isAnimating || document.hidden) return;
      clearTimeout(autoTimer);

      if (getSlideVideo(activeIndex)) return;

      autoTimer = window.setTimeout(goToNext, interval);
    }

    function goToNext() {
      if (isAnimating) return;

      var leavingIndex = activeIndex;
      activeIndex = getIndex(1);
      isAnimating = true;

      clearTimeout(autoTimer);
      header.classList.add('trust-slider__header--changing');
      applyState(leavingIndex);
      syncMedia();

      headerTimer = setTimeout(function () {
        syncHeader();
        header.classList.remove('trust-slider__header--changing');
      }, headerSwitchDelay);

      animationTimer = setTimeout(function () {
        isAnimating = false;
        applyState();
        syncMedia();
        scheduleNext();
      }, animationDuration);
    }

    function startAutoplay() {
      if (!hasStarted) {
        hasStarted = true;
      }
      syncHeader();
      syncMedia();
      scheduleNext();
    }

    function handleTrigger(event) {
      if (event && event.type === 'keydown' && event.key !== 'Enter' && event.key !== ' ') return;
      if (event && event.type === 'keydown') {
        event.preventDefault();
      }

      startAutoplay();
      goToNext();
    }

    function bindTrigger(element) {
      if (!element) return;
      element.setAttribute('role', 'button');
      element.setAttribute('tabindex', '0');
      element.setAttribute('aria-label', 'Переключить карточку');
      element.addEventListener('click', handleTrigger);
      element.addEventListener('keydown', handleTrigger);
    }

    applyState();
    syncHeader();
    syncMedia();

    document.addEventListener('visibilitychange', function () {
      if (document.hidden) {
        clearTimeout(autoTimer);
        syncMedia();
        return;
      }

      if (hasStarted) {
        syncMedia();
        scheduleNext();
      }
    });

    bindTrigger(header);
    bindTrigger(stack);

    slides.forEach(function (slide, index) {
      var video = slide.querySelector('[data-trust-slider-video]');
      if (!video) return;

      video.addEventListener('ended', function () {
        if (index !== activeIndex || isAnimating || document.hidden) return;
        goToNext();
      });
    });

    startAutoplay();

    if ('IntersectionObserver' in window) {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          startAutoplay();
          observer.disconnect();
        });
      }, {
        threshold: 0.45
      });

      observer.observe(block);
    } else {
      startAutoplay();
    }
  });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTrustSliders);
  } else {
    initTrustSliders();
  }
})();

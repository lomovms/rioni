/**
 * Форма «Создайте аккаунт»: переключение видимости пароля, проверка совпадения паролей,
 * панель рекомендаций (десктоп: сдвиг формы влево; мобилка: выезд снизу) — GSAP
 */
(function () {
  var modal = document.getElementById('create-account-form');
  if (!modal) return;

  var form = modal.querySelector('[data-create-account-form]');
  var toggles = modal.querySelectorAll('[data-create-account-toggle-password]');
  var formSide = modal.querySelector('.create-account-form__form-side');
  var recommendationsPanel = modal.querySelector('[data-create-account-recommendations-panel]');
  var openLink = modal.querySelector('[data-create-account-recommendations]');
  var closeBtn = modal.querySelector('[data-create-account-recommendations-close]');

  var RECOMMENDATIONS_DURATION = 0.35;
  var RECOMMENDATIONS_EASE = 'power2.inOut';
  var mobileQuery = window.matchMedia('(max-width: 767px)');
  var isRecommendationsOpen = false;
  var recommendationsTween = null;

  function openRecommendations() {
    if (isRecommendationsOpen || typeof gsap === 'undefined') return;
    isRecommendationsOpen = true;
    modal.classList.add('create-account-form--recommendations-open');

    if (mobileQuery.matches) {
      gsap.set(recommendationsPanel, { yPercent: 100, pointerEvents: 'none' });
      recommendationsTween = gsap.to(recommendationsPanel, {
        yPercent: 0,
        duration: RECOMMENDATIONS_DURATION,
        ease: RECOMMENDATIONS_EASE,
        pointerEvents: 'auto',
        overwrite: true
      });
    } else {
      gsap.set(recommendationsPanel, { width: 0, flex: '0 0 0' });
      gsap.set(formSide, { flex: '1 1 100%' });
      recommendationsTween = gsap.to(recommendationsPanel, {
        width: 352,
        flex: '0 0 352px',
        duration: RECOMMENDATIONS_DURATION,
        ease: RECOMMENDATIONS_EASE,
        overwrite: true
      });
    }
  }

  function closeRecommendations() {
    if (!isRecommendationsOpen || typeof gsap === 'undefined') return;
    isRecommendationsOpen = false;
    modal.classList.remove('create-account-form--recommendations-open');

    if (mobileQuery.matches) {
      recommendationsTween = gsap.to(recommendationsPanel, {
        yPercent: 100,
        duration: RECOMMENDATIONS_DURATION,
        ease: RECOMMENDATIONS_EASE,
        pointerEvents: 'none',
        overwrite: true
      });
    } else {
      recommendationsTween = gsap.to(recommendationsPanel, {
        width: 0,
        flex: '0 0 0',
        duration: RECOMMENDATIONS_DURATION,
        ease: RECOMMENDATIONS_EASE,
        overwrite: true
      });
    }
  }

  function toggleRecommendations() {
    if (isRecommendationsOpen) closeRecommendations(); else openRecommendations();
  }

  if (openLink) {
    openLink.addEventListener('click', function (e) {
      e.preventDefault();
      openRecommendations();
    });
  }
  if (closeBtn) {
    closeBtn.addEventListener('click', function () {
      closeRecommendations();
    });
  }

  // Сброс панели при закрытии модалки (Magnific ставит aria-hidden="true")
  var observer = new MutationObserver(function (mutations) {
    if (modal.getAttribute('aria-hidden') === 'true' && isRecommendationsOpen) {
      isRecommendationsOpen = false;
      modal.classList.remove('create-account-form--recommendations-open');
      if (typeof gsap !== 'undefined') {
        if (mobileQuery.matches) {
          gsap.set(recommendationsPanel, { yPercent: 100, pointerEvents: 'none' });
        } else {
          gsap.set(recommendationsPanel, { width: 0, flex: '0 0 0' });
          gsap.set(formSide, { flex: '1 1 100%' });
        }
      }
    }
  });
  observer.observe(modal, { attributes: true, attributeFilter: ['aria-hidden'] });

  toggles.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var wrap = btn.closest('.create-account-form__password-wrap');
      var input = wrap && wrap.querySelector('.create-account-form__input--password');
      if (!input) return;
      var hiddenIcon = btn.querySelector('.create-account-form__toggle-icon--hidden');
      var visibleIcon = btn.querySelector('.create-account-form__toggle-icon--visible');
      if (input.type === 'password') {
        input.type = 'text';
        btn.setAttribute('aria-label', 'Скрыть пароль');
        if (hiddenIcon) hiddenIcon.setAttribute('aria-hidden', 'true');
        if (visibleIcon) visibleIcon.setAttribute('aria-hidden', 'false');
        if (hiddenIcon) hiddenIcon.style.display = 'none';
        if (visibleIcon) visibleIcon.style.display = 'block';
      } else {
        input.type = 'password';
        btn.setAttribute('aria-label', 'Показать пароль');
        if (hiddenIcon) hiddenIcon.setAttribute('aria-hidden', 'false');
        if (visibleIcon) visibleIcon.setAttribute('aria-hidden', 'true');
        if (hiddenIcon) hiddenIcon.style.display = 'block';
        if (visibleIcon) visibleIcon.style.display = 'none';
      }
    });
  });

  if (form) {
    var agreeCheckbox = form.querySelector('[data-create-account-agree]');
    var agreeField = agreeCheckbox && agreeCheckbox.closest('.create-account-form__field');

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var pass = form.querySelector('input[name="password"]');
      var passRepeat = form.querySelector('input[name="password_repeat"]');
      var repeatWrap = passRepeat && passRepeat.closest('.create-account-form__field');
      if (repeatWrap) repeatWrap.classList.remove('create-account-form__field--error');
      if (pass && passRepeat && pass.value !== passRepeat.value) {
        if (repeatWrap) repeatWrap.classList.add('create-account-form__field--error');
        return;
      }
      if (agreeField) agreeField.classList.remove('create-account-form__field--error');
      if (agreeCheckbox && !agreeCheckbox.checked) {
        if (agreeField) agreeField.classList.add('create-account-form__field--error');
        return;
      }

      var loginInput = form.querySelector('input[name="login"]');
      var loginValue = loginInput ? loginInput.value.trim() : '';
      var usernameEl = document.querySelector('.popup-after-registration__username');
      if (usernameEl) usernameEl.textContent = loginValue || 'User';
      try {
        if (loginValue) localStorage.setItem('rioni_last_login', loginValue);
      } catch (err) {}

      if (typeof $ !== 'undefined' && $.magnificPopup) {
        $.magnificPopup.close();
        setTimeout(function () {
          $.magnificPopup.open({
            items: { src: '#after-registration-welcome' },
            type: 'inline',
            mainClass: 'mfp-zoom-in',
            closeMarkup: '<button title="Закрыть" type="button" class="mfp-close popup__close"></button>',
            removalDelay: 500
          });
        }, 300);
      }
    });
  }
})();

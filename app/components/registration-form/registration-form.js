/**
 * Модальная форма «Регистрация профиля»:
 * - селект страны (RU/GE) и маска телефона
 * - валидация полей (красное подчёркивание при ошибке)
 * - состояния: form | loading | success | error (для разных сценариев после отправки)
 */
(function () {
  const modal = document.getElementById('registration-form');
  if (!modal) return;

  const form = modal.querySelector('[data-registration-form]');
  const countryWrap = modal.querySelector('.js-reg-country-select');
  const countrySelect = modal.querySelector('[data-reg-country-select]');
  const countryFlag = modal.querySelector('.registration-form__country-flag');
  const trigger = modal.querySelector('.registration-form__country-trigger');
  const dropdown = modal.querySelector('.registration-form__country-dropdown');
  const options = modal.querySelectorAll('.registration-form__country-option');
  const phoneInput = modal.querySelector('.registration-form__input--phone');
  const retryBtn = modal.querySelector('[data-reg-retry]');
  var codeAttempts = 0;

  const MASKS = {
    ru: {
      code: '+7',
      pattern: /^(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})$/,
      format: function (_, a, b, c, d) {
        var s = '';
        if (a) s = '(' + a + ')';
        if (b) s += (s ? ' ' : '') + b;
        if (c) s += (s ? '-' : '') + c;
        if (d) s += (s ? '-' : '') + d;
        return s ? ' ' + s : '';
      },
      maxDigits: 10,
    },
    ge: {
      code: '+995',
      pattern: /^(\d{0,3})(\d{0,2})(\d{0,2})(\d{0,2})$/,
      format: function (_, a, b, c, d) {
        var parts = [a, b, c, d].filter(Boolean);
        return parts.length ? ' ' + parts.join(' ') : '';
      },
      maxDigits: 9,
    },
    am: {
      code: '+374',
      pattern: /^(\d{0,2})(\d{0,2})(\d{0,2})(\d{0,2})$/,
      format: function (_, a, b, c, d) {
        var parts = [a, b, c, d].filter(Boolean);
        return parts.length ? ' ' + parts.join(' ') : '';
      },
      maxDigits: 8,
    },
    es: {
      code: '+34',
      pattern: /^(\d{0,3})(\d{0,3})(\d{0,3})$/,
      format: function (_, a, b, c) {
        var parts = [a, b, c].filter(Boolean);
        return parts.length ? ' ' + parts.join(' ') : '';
      },
      maxDigits: 9,
    },
    pt: {
      code: '+351',
      pattern: /^(\d{0,3})(\d{0,3})(\d{0,3})$/,
      format: function (_, a, b, c) {
        var parts = [a, b, c].filter(Boolean);
        return parts.length ? ' ' + parts.join(' ') : '';
      },
      maxDigits: 9,
    },
    fr: {
      code: '+33',
      pattern: /^(\d{0,1})(\d{0,2})(\d{0,2})(\d{0,2})(\d{0,2})$/,
      format: function (_, a, b, c, d, e) {
        var parts = [a, b, c, d, e].filter(Boolean);
        return parts.length ? ' ' + parts.join(' ') : '';
      },
      maxDigits: 9,
    },
    gr: {
      code: '+30',
      pattern: /^(\d{0,3})(\d{0,3})(\d{0,4})$/,
      format: function (_, a, b, c) {
        var parts = [a, b, c].filter(Boolean);
        return parts.length ? ' ' + parts.join(' ') : '';
      },
      maxDigits: 10,
    },
    kg: {
      code: '+996',
      pattern: /^(\d{0,3})(\d{0,2})(\d{0,2})(\d{0,2})$/,
      format: function (_, a, b, c, d) {
        var parts = [a, b, c, d].filter(Boolean);
        return parts.length ? ' ' + parts.join(' ') : '';
      },
      maxDigits: 9,
    },
  };

  const FLAG_IMAGES = {
    ru: './assets/images/required/flag-ru.svg',
    ge: './assets/images/required/flag-ge.svg',
    am: './assets/images/required/flag-am.svg',
    es: './assets/images/required/flag-es.svg',
    pt: './assets/images/required/flag-pt.svg',
    fr: './assets/images/required/flag-fr.svg',
    gr: './assets/images/required/flag-gr.svg',
    kg: './assets/images/required/flag-kg.svg',
  };

  function getCountry() {
    return countrySelect && countrySelect.value in MASKS ? countrySelect.value : 'ru';
  }

  function getMask() {
    return MASKS[getCountry()];
  }

  function setFlagDisplay() {
    if (!countryFlag) return;
    var src = FLAG_IMAGES[getCountry()];
    if (src) {
      countryFlag.style.backgroundImage = 'url(' + src + ')';
      countryFlag.style.display = 'block';
    } else {
      countryFlag.style.backgroundImage = 'none';
      countryFlag.style.display = 'none';
    }
  }

  function openDropdown() {
    if (countryWrap) countryWrap.classList.add('is-open');
    if (trigger) trigger.setAttribute('aria-expanded', 'true');
    if (dropdown) dropdown.setAttribute('aria-hidden', 'false');
  }

  function closeDropdown() {
    if (countryWrap) countryWrap.classList.remove('is-open');
    if (trigger) trigger.setAttribute('aria-expanded', 'false');
    if (dropdown) dropdown.setAttribute('aria-hidden', 'true');
  }

  function selectCountry(value) {
    if (!MASKS[value] || !countrySelect || !phoneInput) return;
    countrySelect.value = value;
    setFlagDisplay();
    phoneInput.value = getMask().code;
    closeDropdown();
    countrySelect.dispatchEvent(new Event('change', { bubbles: true }));
  }

  function digitsOnly(str) {
    return (str || '').replace(/\D/g, '');
  }

  function getUserDigits() {
    var mask = getMask();
    var all = digitsOnly(phoneInput.value);
    var codeDigits = digitsOnly(mask.code);
    if (codeDigits && all.indexOf(codeDigits) === 0) all = all.slice(codeDigits.length);
    return all.slice(0, mask.maxDigits);
  }

  function formatPhone(userDigits) {
    var mask = getMask();
    var match = (userDigits || '').match(mask.pattern) || [];
    return mask.code + mask.format.apply(null, match);
  }

  function applyPhoneMask() {
    if (!phoneInput) return;
    var userDigits = getUserDigits();
    phoneInput.value = formatPhone(userDigits);
  }

  function onPhoneInput() {
    if (!phoneInput) return;
    var start = phoneInput.selectionStart;
    var oldLen = phoneInput.value.length;
    applyPhoneMask();
    var newLen = phoneInput.value.length;
    var newStart = Math.max(0, start + (newLen - oldLen));
    phoneInput.setSelectionRange(newStart, newStart);
  }

  // --- Состояния формы ---
  function setState(state) {
    if (['form', 'loading', 'success', 'error', 'code', 'lockout'].indexOf(state) === -1) return;
    modal.setAttribute('data-state', state);
  }

  function getFieldWrap(el) {
    return el && el.closest && el.closest('.registration-form__field');
  }

  function clearError(el) {
    var wrap = getFieldWrap(el);
    if (wrap) wrap.classList.remove('registration-form__field--error');
  }

  function setError(el) {
    var wrap = getFieldWrap(el);
    if (wrap) wrap.classList.add('registration-form__field--error');
  }

  function validateForm() {
    var valid = true;
    var required = form.querySelectorAll('input[required]');
    required.forEach(function (el) {
      var wrap = getFieldWrap(el);
      if (!wrap) return;
      var filled = false;
      if (el.type === 'checkbox') {
        filled = el.checked;
      } else if (el === phoneInput) {
        // телефон обязателен и должен содержать полное количество цифр (RU: 10, GE: 9)
        filled = getUserDigits().length === getMask().maxDigits;
      } else {
        filled = (el.value || '').trim().length > 0;
      }
      if (!filled) {
        wrap.classList.add('registration-form__field--error');
        valid = false;
      } else {
        wrap.classList.remove('registration-form__field--error');
      }
    });
    // формат email
    var emailInput = form.querySelector('input[type="email"]');
    if (emailInput && emailInput.value.trim()) {
      var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRe.test(emailInput.value.trim())) {
        setError(emailInput);
        valid = false;
      }
    }
    return valid;
  }

  function submitForm() {
    setState('loading');
    var phoneForCode = phoneInput ? phoneInput.value.trim() : '';
    // Имитация отправки; после загрузки переходим на ввод кода
    setTimeout(function () {
      codeAttempts = 0;
      setState('code');
      try {
        localStorage.setItem('rioni_onboarding_resume_pending', '1');
      } catch (err) {}
      var codePhoneEl = modal.querySelector('[data-reg-code-phone]');
      if (codePhoneEl) codePhoneEl.textContent = phoneForCode || '+7 (999) 999-99-99';
      initCodeStep();
    }, 1200);
  }

  var codeStepInitialized = false;
  function initCodeStep() {
    var codeInputsWrap = modal.querySelector('[data-reg-code-inputs]');
    var codeDigits = modal.querySelectorAll('[data-reg-code-digit]');
    var codeErrorEl = modal.querySelector('[data-reg-code-error]');
    var codeBackBtn = modal.querySelector('[data-reg-code-back]');
    var resendLink = modal.querySelector('[data-reg-code-resend]');
    var resendTimerEl = modal.querySelector('[data-reg-resend-timer]');
    if (!codeInputsWrap || !codeDigits.length) return;
    if (codeStepInitialized) {
      codeDigits.forEach(function (inp) { inp.value = ''; });
      codeInputsWrap.classList.remove('registration-form__code-inputs--error');
      if (codeErrorEl) codeErrorEl.setAttribute('aria-hidden', 'true');
      if (codeDigits[0]) codeDigits[0].focus();
      return;
    }
    codeStepInitialized = true;

    function clearCodeError() {
      codeInputsWrap.classList.remove('registration-form__code-inputs--error');
      if (codeErrorEl) codeErrorEl.setAttribute('aria-hidden', 'true');
    }

    function showCodeError() {
      codeInputsWrap.classList.add('registration-form__code-inputs--error');
      if (codeErrorEl) codeErrorEl.setAttribute('aria-hidden', 'false');
    }

    function getCodeValue() {
      return Array.prototype.map.call(codeDigits, function (inp) { return inp.value; }).join('');
    }

    function checkCode() {
      var code = getCodeValue();
      if (code.length !== 6) return;
      // Для демо: верный код 123456 — после правильного кода открываем форму «Создайте аккаунт»
      if (code === '123456') {
        try {
          localStorage.removeItem('rioni_onboarding_resume_pending');
        } catch (err) {}
        document.dispatchEvent(new CustomEvent('rioni:open-create-account'));
      } else {
        codeAttempts++;
        if (codeAttempts >= 3) {
          setState('lockout');
        } else {
          showCodeError();
          codeDigits[0].focus();
        }
      }
    }

    codeDigits.forEach(function (inp, i) {
      inp.value = '';
      inp.addEventListener('input', function (e) {
        var val = (e.target.value || '').replace(/\D/g, '').slice(0, 1);
        e.target.value = val;
        clearCodeError();
        if (val && i < codeDigits.length - 1) codeDigits[i + 1].focus();
        checkCode();
      });
      inp.addEventListener('keydown', function (e) {
        if (e.key === 'Backspace' && !e.target.value && i > 0) {
          codeDigits[i - 1].focus();
        }
      });
      inp.addEventListener('paste', function (e) {
        e.preventDefault();
        var pasted = (e.clipboardData || window.clipboardData).getData('text').replace(/\D/g, '').slice(0, 6);
        for (var j = 0; j < pasted.length && j < codeDigits.length; j++) {
          codeDigits[j].value = pasted[j];
        }
        clearCodeError();
        if (pasted.length > 0) codeDigits[Math.min(pasted.length, codeDigits.length - 1)].focus();
        checkCode();
      });
    });

    if (codeBackBtn) {
      codeBackBtn.addEventListener('click', function () {
        setState('form');
      });
    }

    if (resendLink && resendTimerEl) {
      var resendCount = 30;
      resendLink.classList.add('is-disabled');
      resendLink.setAttribute('href', '#');
      function startResendCountdown() {
        resendCount = 30;
        resendLink.classList.add('is-disabled');
        if (!resendLink.querySelector('[data-reg-resend-timer]')) {
          var span = document.createElement('span');
          span.className = 'registration-form__code-resend-timer';
          span.setAttribute('data-reg-resend-timer', '');
          resendLink.appendChild(document.createTextNode(' через '));
          resendLink.appendChild(span);
        }
        var timerSpan = resendLink.querySelector('[data-reg-resend-timer]');
        if (timerSpan) timerSpan.textContent = resendCount;
        var t = setInterval(function () {
          resendCount--;
          if (timerSpan) timerSpan.textContent = resendCount;
          if (resendCount <= 0) {
            clearInterval(t);
            resendLink.classList.remove('is-disabled');
            resendLink.innerHTML = 'Отправить повторно';
          }
        }, 1000);
      }
      resendLink.addEventListener('click', function (e) {
        e.preventDefault();
        if (resendLink.classList.contains('is-disabled')) return;
        startResendCountdown();
      });
      startResendCountdown();
    }

    if (codeDigits[0]) codeDigits[0].focus();
  }

  // --- Инициализация ---
  if (countryFlag) {
    options.forEach(function (el) {
      var val = el.getAttribute('data-value');
      if (val && FLAG_IMAGES[val]) {
        el.style.backgroundImage = 'url(' + FLAG_IMAGES[val] + ')';
      }
    });
    setFlagDisplay();
  }
  if (phoneInput) applyPhoneMask();

  if (trigger) {
    trigger.addEventListener('click', function (e) {
      e.preventDefault();
      if (countryWrap.classList.contains('is-open')) closeDropdown();
      else openDropdown();
    });
    trigger.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        if (countryWrap.classList.contains('is-open')) closeDropdown();
        else openDropdown();
      }
    });
  }

  options.forEach(function (opt) {
    opt.addEventListener('click', function (e) {
      e.preventDefault();
      selectCountry(opt.getAttribute('data-value'));
    });
    opt.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        selectCountry(opt.getAttribute('data-value'));
      }
    });
  });

  document.addEventListener('click', function (e) {
    if (countryWrap && countryWrap.classList.contains('is-open') && !countryWrap.contains(e.target)) {
      closeDropdown();
    }
  });

  if (countrySelect) {
    countrySelect.addEventListener('change', function () {
      setFlagDisplay();
      applyPhoneMask();
    });
  }

  if (phoneInput) {
    phoneInput.addEventListener('input', onPhoneInput);
    phoneInput.addEventListener('paste', function (e) {
      e.preventDefault();
      var pasted = (e.clipboardData || window.clipboardData).getData('text');
      var digits = digitsOnly(pasted).slice(0, getMask().maxDigits);
      phoneInput.value = formatPhone(digits);
    });
  }

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var fields = form.querySelectorAll('.registration-form__field');
      fields.forEach(function (f) { f.classList.remove('registration-form__field--error'); });
      if (!validateForm()) return;
      submitForm();
    });

    form.addEventListener('input', function (e) {
      clearError(e.target);
    });
    form.addEventListener('change', function (e) {
      clearError(e.target);
    });
  }

  if (retryBtn) {
    retryBtn.addEventListener('click', function () {
      setState('form');
    });
  }

  document.addEventListener('rioni:registration-form-opened', function () {
    setState('form');
  });
})();

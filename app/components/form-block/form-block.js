/**
 * Форма обратной связи: маска телефона и кастомный селект страны (только флаги)
 */
(function () {
  const form = document.querySelector('.form-block__form');
  if (!form) return;

  const countryWrap = form.querySelector('.js-country-select');
  const countrySelect = form.querySelector('#form-country');
  const countryFlag = form.querySelector('#form-country-flag');
  const trigger = form.querySelector('.form-block__country-trigger');
  const dropdown = form.querySelector('.form-block__country-dropdown');
  const options = form.querySelectorAll('.form-block__country-option');
  const phoneInput = form.querySelector('#form-phone');

  if (!countrySelect || !phoneInput || !countryWrap || !trigger || !dropdown) return;

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
      placeholder: ' (999) 999-99-99',
    },
    ge: {
      code: '+995',
      pattern: /^(\d{0,3})(\d{0,2})(\d{0,2})(\d{0,2})$/,
      format: function (_, a, b, c, d) {
        var parts = [a, b, c, d].filter(Boolean);
        return parts.length ? ' ' + parts.join(' ') : '';
      },
      maxDigits: 9,
      placeholder: ' 999 99 99 99',
    },
  };

  const FLAG_IMAGES = {
    ru: './assets/images/required/flag-ru.svg',
    ge: './assets/images/required/flag-ge.svg',
  };

  function getCountry() {
    return countrySelect.value in MASKS ? countrySelect.value : 'ru';
  }

  function getMask() {
    return MASKS[getCountry()];
  }

  function setFlagDisplay() {
    var src = FLAG_IMAGES[getCountry()];
    if (countryFlag) {
      if (src) {
        countryFlag.style.backgroundImage = 'url(' + src + ')';
        countryFlag.style.display = 'block';
      } else {
        countryFlag.style.backgroundImage = 'none';
        countryFlag.style.display = 'none';
      }
    }
  }

  function setOptionFlags() {
    options.forEach(function (el) {
      var val = el.getAttribute('data-value');
      if (val && FLAG_IMAGES[val]) {
        el.style.backgroundImage = 'url(' + FLAG_IMAGES[val] + ')';
      }
    });
  }

  function openDropdown() {
    countryWrap.classList.add('is-open');
    trigger.setAttribute('aria-expanded', 'true');
    dropdown.setAttribute('aria-hidden', 'false');
  }

  function closeDropdown() {
    countryWrap.classList.remove('is-open');
    trigger.setAttribute('aria-expanded', 'false');
    dropdown.setAttribute('aria-hidden', 'true');
  }

  function selectCountry(value) {
    if (!MASKS[value]) return;
    countrySelect.value = value;
    setFlagDisplay();
    phoneInput.value = getMask().code;
    phoneInput.setAttribute('placeholder', '');
    closeDropdown();
    countrySelect.dispatchEvent(new Event('change', { bubbles: true }));
  }

  function digitsOnly(str) {
    return (str || '').replace(/\D/g, '');
  }

  function getUserDigits() {
    var mask = getMask();
    var code = mask.code;
    var all = digitsOnly(phoneInput.value);
    if (code === '+7' && all.indexOf('7') === 0) all = all.slice(1);
    if (code === '+995' && all.indexOf('995') === 0) all = all.slice(3);
    return all.slice(0, mask.maxDigits);
  }

  function formatPhone(userDigits) {
    var mask = getMask();
    var match = (userDigits || '').match(mask.pattern) || [];
    return mask.code + mask.format.apply(null, match);
  }

  function applyPhoneMask() {
    var userDigits = getUserDigits();
    phoneInput.value = formatPhone(userDigits);
    phoneInput.setAttribute('placeholder', '');
  }

  function onPhoneInput() {
    var start = phoneInput.selectionStart;
    var oldLen = phoneInput.value.length;
    applyPhoneMask();
    var newLen = phoneInput.value.length;
    var newStart = Math.max(0, start + (newLen - oldLen));
    phoneInput.setSelectionRange(newStart, newStart);
  }

  setOptionFlags();
  setFlagDisplay();
  applyPhoneMask();

  trigger.addEventListener('click', function (e) {
    e.preventDefault();
    if (countryWrap.classList.contains('is-open')) {
      closeDropdown();
    } else {
      openDropdown();
    }
  });

  trigger.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (countryWrap.classList.contains('is-open')) closeDropdown();
      else openDropdown();
    }
  });

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
    if (countryWrap.classList.contains('is-open') && !countryWrap.contains(e.target)) {
      closeDropdown();
    }
  });

  countrySelect.addEventListener('change', function () {
    setFlagDisplay();
    applyPhoneMask();
  });

  phoneInput.addEventListener('input', onPhoneInput);
  phoneInput.addEventListener('paste', function (e) {
    e.preventDefault();
    var pasted = (e.clipboardData || window.clipboardData).getData('text');
    var digits = digitsOnly(pasted).slice(0, getMask().maxDigits);
    phoneInput.value = formatPhone(digits);
  });
})();

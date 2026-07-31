import Inputmask from 'inputmask';
import { allCountries } from 'country-telephone-data';

const DEFAULT_COUNTRY = 'ge';
const PREFERRED_COUNTRIES = ['ge', 'ru'];

function getCountryFlagUrl(iso2) {
  return 'https://flagcdn.com/' + String(iso2 || '').toLowerCase() + '.svg';
}

function getCountryMask(country) {
  if (country.format && country.format.indexOf('.') !== -1) {
    return country.format.replace(/\./g, '9').replace(/-/g, ' ');
  }

  return country.code + ' 999999999999';
}

function normalizeCountry(country) {
  var dialCode = String(country.dialCode || '').replace(/\D/g, '');

  return {
    name: country.name,
    iso2: country.iso2,
    dialCode: dialCode,
    code: '+' + dialCode,
    flag: getCountryFlagUrl(country.iso2),
    format: country.format || '',
    hasFormat: Boolean(country.format && country.format.indexOf('.') !== -1),
  };
}

function buildCountries() {
  var seen = {};
  var countries = allCountries.reduce(function (acc, country) {
    if (!country.iso2 || !country.dialCode || seen[country.iso2]) return acc;

    seen[country.iso2] = true;
    acc.push(normalizeCountry(country));
    return acc;
  }, []);
  var countryMap = countries.reduce(function (acc, country) {
    acc[country.iso2] = country;
    return acc;
  }, {});
  var preferred = PREFERRED_COUNTRIES
    .map(function (iso2) {
      return countryMap[iso2];
    })
    .filter(Boolean);
  var preferredMap = preferred.reduce(function (acc, country) {
    acc[country.iso2] = true;
    return acc;
  }, {});
  var rest = countries
    .filter(function (country) {
      return !preferredMap[country.iso2];
    })
    .sort(function (a, b) {
      return a.name.localeCompare(b.name);
    });

  return preferred.concat(rest).map(function (country) {
    return Object.assign({}, country, {
      mask: getCountryMask(country),
    });
  });
}

const COUNTRIES = buildCountries();
const COUNTRY_MAP = COUNTRIES.reduce(function (acc, country) {
  acc[country.iso2] = country;
  return acc;
}, {});
const COUNTRIES_BY_DIAL_CODE = COUNTRIES.slice().sort(function (a, b) {
  return b.dialCode.length - a.dialCode.length;
});

/**
 * Форма обратной связи: маска телефона и кастомный селект страны.
 */
(function () {
  const forms = document.querySelectorAll('.form-block__form');
  if (!forms.length) return;

  function initCountrySelect(form) {
    const countryWrap = form.querySelector('.js-country-select');
    const countrySelect = form.querySelector('select[name="country"]');
    const countryFlag = form.querySelector('.form-block__country-flag');
    const trigger = form.querySelector('.form-block__country-trigger');
    const dropdown = form.querySelector('.form-block__country-dropdown');
    const phoneInput = form.querySelector('.form-block__input--phone');

    if (!countrySelect || !phoneInput || !countryWrap || !trigger || !dropdown) return;

    let activeMaskCountry = '';

    function getMaskOptions(country) {
      return {
        mask: COUNTRY_MAP[country].mask,
        showMaskOnFocus: false,
        showMaskOnHover: false,
        clearIncomplete: false,
        placeholder: '',
        greedy: false,
      };
    }

    function getCountry() {
      return countrySelect.value in COUNTRY_MAP ? countrySelect.value : DEFAULT_COUNTRY;
    }

    function digitsOnly(str) {
      return (str || '').replace(/\D/g, '');
    }

    function setFlagDisplay() {
      var country = COUNTRY_MAP[getCountry()];
      if (countryFlag) {
        countryFlag.textContent = '';
        countryFlag.title = country ? country.name + ' ' + country.code : '';
        countryFlag.style.backgroundImage = country ? 'url(' + country.flag + ')' : 'none';
        countryFlag.style.display = country ? 'flex' : 'none';
      }
    }

    function setOptionState() {
      var currentCountry = getCountry();
      dropdown.querySelectorAll('.form-block__country-option').forEach(function (el) {
        el.setAttribute('aria-selected', el.getAttribute('data-value') === currentCountry ? 'true' : 'false');
      });
    }

    function renderCountries() {
      var selectedCountry = countrySelect.value in COUNTRY_MAP ? countrySelect.value : DEFAULT_COUNTRY;

      dropdown.innerHTML = '';
      countrySelect.innerHTML = '';

      COUNTRIES.forEach(function (country) {
        var option = document.createElement('div');
        var flag = document.createElement('span');
        var code = document.createElement('span');
        var nativeOption = document.createElement('option');

        option.className = 'form-block__country-option';
        option.setAttribute('role', 'option');
        option.setAttribute('data-value', country.iso2);
        option.setAttribute('data-code', country.code);
        option.setAttribute('tabindex', '0');
        option.setAttribute('title', country.name + ' ' + country.code);

        flag.className = 'form-block__country-option-flag';
        flag.style.backgroundImage = 'url(' + country.flag + ')';

        code.className = 'form-block__country-option-code';
        code.textContent = country.code;

        option.appendChild(flag);
        option.appendChild(code);
        dropdown.appendChild(option);

        nativeOption.value = country.iso2;
        nativeOption.textContent = country.iso2.toUpperCase();
        nativeOption.setAttribute('data-code', country.code);
        countrySelect.appendChild(nativeOption);
      });

      countrySelect.value = selectedCountry;
      setOptionState();
    }

    function findCountryByDigits(digits) {
      if (!digits) return '';

      var exact = COUNTRIES_BY_DIAL_CODE.find(function (country) {
        return digits.indexOf(country.dialCode) === 0;
      });
      if (exact) return exact.iso2;

      var preferred = PREFERRED_COUNTRIES
        .map(function (iso2) {
          return COUNTRY_MAP[iso2];
        })
        .find(function (country) {
          return country && country.dialCode.indexOf(digits) === 0;
        });

      return preferred ? preferred.iso2 : '';
    }

    function setCountryByDigits(value) {
      var digits = digitsOnly(value);
      var nextCountry = findCountryByDigits(digits) || countrySelect.value;

      if (nextCountry !== countrySelect.value && COUNTRY_MAP[nextCountry]) {
        countrySelect.value = nextCountry;
        setFlagDisplay();
        setOptionState();
        applyPhoneMask(nextCountry);
      }
    }

    function applyPhoneMask(country) {
      if (!COUNTRY_MAP[country] || activeMaskCountry === country) return;

      var value = phoneInput.value;
      if (phoneInput.inputmask) phoneInput.inputmask.remove();

      new Inputmask(getMaskOptions(country)).mask(phoneInput);
      activeMaskCountry = country;

      if (value) Inputmask.setValue(phoneInput, value);
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
      var country = COUNTRY_MAP[value];
      if (!country) return;

      countrySelect.value = value;
      setFlagDisplay();
      setOptionState();
      applyPhoneMask(value);
      Inputmask.setValue(phoneInput, country.code);
      closeDropdown();
      countrySelect.dispatchEvent(new Event('change', { bubbles: true }));
    }

    renderCountries();

    if (!phoneInput.value) {
      countrySelect.value = DEFAULT_COUNTRY;
    }

    setFlagDisplay();
    setOptionState();
    applyPhoneMask(getCountry());

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

    dropdown.querySelectorAll('.form-block__country-option').forEach(function (opt) {
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
      setOptionState();
      applyPhoneMask(getCountry());
    });

    phoneInput.addEventListener('input', function () {
      if (phoneInput.value === '+') {
        Inputmask.setValue(phoneInput, '');
        countrySelect.value = DEFAULT_COUNTRY;
        setFlagDisplay();
        setOptionState();
        applyPhoneMask(DEFAULT_COUNTRY);
        return;
      }

      if (!phoneInput.value) {
        countrySelect.value = DEFAULT_COUNTRY;
        setFlagDisplay();
        setOptionState();
        applyPhoneMask(DEFAULT_COUNTRY);
        return;
      }

      setCountryByDigits(phoneInput.value);
    });

    phoneInput.addEventListener('keydown', function (e) {
      if ((e.key === 'Backspace' || e.key === 'Delete') && phoneInput.value === '+') {
        e.preventDefault();
        Inputmask.setValue(phoneInput, '');
      }
    });
  }

  forms.forEach(function (form) {
    initCountrySelect(form);
  });
})();

/**
 * Валидация формы: красное подчёркивание при ошибке; после успешной отправки показ окошка успеха в form-block__right
 */
(function () {
  var forms = document.querySelectorAll('.form-block__form');
  if (!forms.length) return;

  function getFieldWrap(el) {
    return el && el.closest && el.closest('.form-block__field');
  }

  function getErrorEl(wrap) {
    var error = wrap && wrap.querySelector('.form-block__error');
    if (!wrap || error) return error;

    error = document.createElement('span');
    error.className = 'form-block__error';
    error.setAttribute('aria-live', 'polite');
    wrap.appendChild(error);
    return error;
  }

  function clearError(el) {
    var wrap = getFieldWrap(el);
    if (!wrap) return;

    wrap.classList.remove('form-block__field--error');
    var error = getErrorEl(wrap);
    if (error) error.textContent = '';
  }

  function setError(el, message) {
    var wrap = getFieldWrap(el);
    if (!wrap) return;

    wrap.classList.add('form-block__field--error');
    var error = getErrorEl(wrap);
    if (error) error.textContent = message || 'Заполните обязательное поле';
  }

  function isIgnoredField(el) {
    return Boolean(el && el.classList && el.classList.contains('form-block__textarea'));
  }

  function getPhoneUserDigits(el) {
    var form = el.closest('form');
    var countrySelect = form && form.querySelector('select[name="country"]');
    var country = countrySelect && COUNTRY_MAP[countrySelect.value] ? COUNTRY_MAP[countrySelect.value] : COUNTRY_MAP[DEFAULT_COUNTRY];
    var digits = (el.value || '').replace(/\D/g, '');

    if (country && digits.indexOf(country.dialCode) === 0) return digits.slice(country.dialCode.length);
    return digits;
  }

  function getPhoneMaxDigits(el) {
    var form = el.closest('form');
    var countrySelect = form && form.querySelector('select[name="country"]');
    var country = countrySelect && COUNTRY_MAP[countrySelect.value] ? COUNTRY_MAP[countrySelect.value] : COUNTRY_MAP[DEFAULT_COUNTRY];
    var digitsCount = country && country.mask ? (country.mask.match(/9/g) || []).length : 0;

    if (!country) return 10;
    if (!country.hasFormat) return 6;

    return Math.max(digitsCount - country.dialCode.length, 6);
  }

  function getValidationMessage(el) {
    if (isIgnoredField(el)) return '';

    var value = (el.value || '').trim();

    if (el.type === 'checkbox') {
      return el.checked ? '' : 'Необходимо ваше согласие на обработку персональных данных';
    }

    if (el.classList && el.classList.contains('form-block__input--phone')) {
      return getPhoneUserDigits(el).length >= getPhoneMaxDigits(el) ? '' : 'Неверный номер телефона';
    }

    if (el.type === 'email') {
      return value && el.validity && !el.validity.typeMismatch ? '' : 'Неверный E-mail';
    }

    if (!value) return 'Заполните обязательное поле';

    return '';
  }

  function validateForm(form) {
    var valid = true;
    var required = form.querySelectorAll('input[required]');
    required.forEach(function (el) {
      var wrap = getFieldWrap(el);
      if (!wrap) return;
      var message = getValidationMessage(el);
      if (message) {
        setError(el, message);
        valid = false;
      } else {
        clearError(el);
      }
    });
    return valid;
  }

  function showSuccess(form) {
    var block = form.closest('.form-block');
    if (!block) return;
    var right = block.querySelector('.form-block__right');
    var success = block.querySelector('.form-block__success');
    if (right && success) {
      right.classList.add('form-block__right--success');
      success.setAttribute('aria-hidden', 'false');
    }
  }

  forms.forEach(function (form) {
    form.setAttribute('novalidate', 'novalidate');
    form.noValidate = true;
    form.querySelectorAll('.form-block__textarea').forEach(function (textarea) {
      textarea.removeAttribute('required');
      textarea.required = false;
      clearError(textarea);
    });

    form.addEventListener('invalid', function (e) {
      e.preventDefault();
      if (isIgnoredField(e.target)) {
        e.target.removeAttribute('required');
        e.target.required = false;
        clearError(e.target);
        return;
      }
      setError(e.target, getValidationMessage(e.target));
    }, true);

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var block = form.closest('.form-block');
      var required = block ? block.querySelectorAll('input[required]') : [];
      required.forEach(function (el) {
        clearError(el);
      });
      if (!validateForm(form)) return;
      showSuccess(form);
    });

    form.addEventListener('input', function (e) {
      clearError(e.target);
    });
    form.addEventListener('change', function (e) {
      clearError(e.target);
    });
  });
})();

/**
 * Зона загрузки файла (для варианта формы sectionFormWithFile): отображение имени файла
 */
(function () {
  var fileInputs = document.querySelectorAll('.form-block__form [data-file-input], .career-apply__field--file input[type="file"]');

  function getNameTextEl(nameEl) {
    return nameEl && (nameEl.querySelector('.form-block__file-name-text') || nameEl.querySelector('.career-apply__file-name') || nameEl);
  }

  function setFileState(fileInput, zone, nameEl, file) {
    var nameTextEl = getNameTextEl(nameEl);

    if (file) {
      if (nameTextEl) {
        nameTextEl.textContent = file.name;
        nameTextEl.setAttribute('title', file.name);
      }
      if (nameEl) nameEl.classList.add('has-name');
      if (zone) zone.classList.add('has-file');
    } else {
      if (nameTextEl) {
        nameTextEl.textContent = '';
        nameTextEl.removeAttribute('title');
      }
      if (nameEl) nameEl.classList.remove('has-name');
      if (zone) zone.classList.remove('has-file');
      fileInput.value = '';
    }
  }

  fileInputs.forEach(function (fileInput) {
    var form = fileInput.closest('form');
    var zone = fileInput.closest('[data-file-zone]') || (form && form.querySelector('[data-file-zone]'));
    var nameEl = zone && (zone.querySelector('[data-file-name]') || zone.parentElement.querySelector('[data-file-name]'));
    var clearBtn = nameEl && nameEl.querySelector('[data-file-clear]');
    if (!zone || !nameEl) return;

    fileInput.addEventListener('change', function () {
      var file = this.files && this.files[0];
      setFileState(fileInput, zone, nameEl, file);
    });

    if (clearBtn) {
      clearBtn.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        setFileState(fileInput, zone, nameEl, null);
        fileInput.dispatchEvent(new Event('change', { bubbles: true }));
      });
    }

    if (zone.tagName !== 'LABEL') {
      zone.addEventListener('click', function () {
        fileInput.click();
      });
    }
  });
})();

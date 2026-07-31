(function initPasswordRecoveryPopup() {
	var root = document.getElementById('password-recovery-popup');
	if (!root) return;

	var tabs = root.querySelectorAll('[data-recovery-tab]');
	var panels = root.querySelectorAll('[data-recovery-panel]');

	function setMode(mode) {
		tabs.forEach(function (tab) {
			var isActive = tab.getAttribute('data-recovery-tab') === mode;
			tab.classList.toggle('is-active', isActive);
			tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
		});

		panels.forEach(function (panel) {
			var isActive = panel.getAttribute('data-recovery-panel') === mode;
			panel.classList.toggle('is-active', isActive);
		});
	}

	tabs.forEach(function (tab) {
		tab.addEventListener('click', function () {
			setMode(tab.getAttribute('data-recovery-tab'));
		});
	});

	function initRecoveryPhoneInput() {
		var countryWrap = root.querySelector('.js-recovery-country-select');
		var countrySelect = root.querySelector('[data-recovery-country-select]');
		var countryFlag = root.querySelector('.registration-form__country-flag');
		var trigger = root.querySelector('.registration-form__country-trigger');
		var dropdown = root.querySelector('.registration-form__country-dropdown');
		var options = root.querySelectorAll('.registration-form__country-option');
		var phoneInput = root.querySelector('.registration-form__input--phone');
		if (!countryWrap || !countrySelect || !countryFlag || !trigger || !dropdown || !phoneInput) return;

		var MASKS = {
			ru: { code: '+7', pattern: /^(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})$/, maxDigits: 10, format: function (_, a, b, c, d) { var s = ''; if (a) s = '(' + a + ')'; if (b) s += (s ? ' ' : '') + b; if (c) s += (s ? '-' : '') + c; if (d) s += (s ? '-' : '') + d; return s ? ' ' + s : ''; } },
			ge: { code: '+995', pattern: /^(\d{0,3})(\d{0,2})(\d{0,2})(\d{0,2})$/, maxDigits: 9, format: function (_, a, b, c, d) { var p = [a, b, c, d].filter(Boolean); return p.length ? ' ' + p.join(' ') : ''; } },
			am: { code: '+374', pattern: /^(\d{0,2})(\d{0,2})(\d{0,2})(\d{0,2})$/, maxDigits: 8, format: function (_, a, b, c, d) { var p = [a, b, c, d].filter(Boolean); return p.length ? ' ' + p.join(' ') : ''; } },
			es: { code: '+34', pattern: /^(\d{0,3})(\d{0,3})(\d{0,3})$/, maxDigits: 9, format: function (_, a, b, c) { var p = [a, b, c].filter(Boolean); return p.length ? ' ' + p.join(' ') : ''; } },
			pt: { code: '+351', pattern: /^(\d{0,3})(\d{0,3})(\d{0,3})$/, maxDigits: 9, format: function (_, a, b, c) { var p = [a, b, c].filter(Boolean); return p.length ? ' ' + p.join(' ') : ''; } },
			fr: { code: '+33', pattern: /^(\d{0,1})(\d{0,2})(\d{0,2})(\d{0,2})(\d{0,2})$/, maxDigits: 9, format: function (_, a, b, c, d, e) { var p = [a, b, c, d, e].filter(Boolean); return p.length ? ' ' + p.join(' ') : ''; } },
			gr: { code: '+30', pattern: /^(\d{0,3})(\d{0,3})(\d{0,4})$/, maxDigits: 10, format: function (_, a, b, c) { var p = [a, b, c].filter(Boolean); return p.length ? ' ' + p.join(' ') : ''; } },
			kg: { code: '+996', pattern: /^(\d{0,3})(\d{0,2})(\d{0,2})(\d{0,2})$/, maxDigits: 9, format: function (_, a, b, c, d) { var p = [a, b, c, d].filter(Boolean); return p.length ? ' ' + p.join(' ') : ''; } }
		};

		var FLAGS = {
			ru: './assets/images/required/flag-ru.svg',
			ge: './assets/images/required/flag-ge.svg',
			am: './assets/images/required/flag-am.svg',
			es: './assets/images/required/flag-es.svg',
			pt: './assets/images/required/flag-pt.svg',
			fr: './assets/images/required/flag-fr.svg',
			gr: './assets/images/required/flag-gr.svg',
			kg: './assets/images/required/flag-kg.svg'
		};

		function currentCountry() {
			return countrySelect.value in MASKS ? countrySelect.value : 'ru';
		}

		function setFlag() {
			var src = FLAGS[currentCountry()];
			countryFlag.style.backgroundImage = src ? 'url(' + src + ')' : 'none';
			countryFlag.style.display = src ? 'block' : 'none';
		}

		function closeDropdown() {
			countryWrap.classList.remove('is-open');
			trigger.setAttribute('aria-expanded', 'false');
			dropdown.setAttribute('aria-hidden', 'true');
		}

		function openDropdown() {
			countryWrap.classList.add('is-open');
			trigger.setAttribute('aria-expanded', 'true');
			dropdown.setAttribute('aria-hidden', 'false');
		}

		function digitsOnly(v) {
			return (v || '').replace(/\D/g, '');
		}

		function getUserDigits() {
			var mask = MASKS[currentCountry()];
			var all = digitsOnly(phoneInput.value);
			var codeDigits = digitsOnly(mask.code);
			if (codeDigits && all.indexOf(codeDigits) === 0) all = all.slice(codeDigits.length);
			return all.slice(0, mask.maxDigits);
		}

		function applyMask() {
			var mask = MASKS[currentCountry()];
			var match = getUserDigits().match(mask.pattern) || [];
			phoneInput.value = mask.code + mask.format.apply(null, match);
		}

		function selectCountry(code) {
			if (!MASKS[code]) return;
			countrySelect.value = code;
			setFlag();
			applyMask();
			closeDropdown();
		}

		options.forEach(function (el) {
			var val = el.getAttribute('data-value');
			if (val && FLAGS[val]) el.style.backgroundImage = 'url(' + FLAGS[val] + ')';
			el.addEventListener('click', function (e) {
				e.preventDefault();
				selectCountry(val);
			});
		});

		trigger.addEventListener('click', function (e) {
			e.preventDefault();
			if (countryWrap.classList.contains('is-open')) closeDropdown();
			else openDropdown();
		});

		document.addEventListener('click', function (e) {
			if (countryWrap.classList.contains('is-open') && !countryWrap.contains(e.target)) closeDropdown();
		});

		phoneInput.addEventListener('input', function () {
			var start = phoneInput.selectionStart || 0;
			var oldLen = phoneInput.value.length;
			applyMask();
			var diff = phoneInput.value.length - oldLen;
			var next = Math.max(0, start + diff);
			phoneInput.setSelectionRange(next, next);
		});

		countrySelect.addEventListener('change', function () {
			setFlag();
			applyMask();
		});

		setFlag();
		applyMask();
	}

	initRecoveryPhoneInput();
	setMode('phone');
})();

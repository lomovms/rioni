(function initLkPasswordToggle() {
	const toggle = document.querySelector('[data-lk-password-toggle]');
	const valueEl = document.querySelector('[data-lk-password-value]');
	if (!toggle || !valueEl) return;

	const hiddenIcon = toggle.querySelector('.lk-profile-card__field-eye-icon--hidden');
	const visibleIcon = toggle.querySelector('.lk-profile-card__field-eye-icon--visible');

	function setState(hidden) {
		const realPassword = valueEl.getAttribute('data-password') || '';
		valueEl.setAttribute('data-password-hidden', hidden ? 'true' : 'false');
		valueEl.textContent = hidden ? '********' : realPassword;
		toggle.setAttribute('aria-label', hidden ? 'Показать пароль' : 'Скрыть пароль');

		if (hiddenIcon) hiddenIcon.style.display = hidden ? 'block' : 'none';
		if (visibleIcon) visibleIcon.style.display = hidden ? 'none' : 'block';
	}

	toggle.addEventListener('click', function() {
		const isHidden = valueEl.getAttribute('data-password-hidden') !== 'false';
		setState(!isHidden);
	});

	setState(true);
})();

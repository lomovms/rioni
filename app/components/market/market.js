(function () {
	var toggles = document.querySelectorAll('[data-market-tabs-toggle]');
	if (!toggles.length) return;

	Array.prototype.forEach.call(toggles, function (toggle) {
		var tabs = toggle.closest('.market__tabs');
		if (!tabs) return;

		toggle.addEventListener('click', function () {
			var isOpen = tabs.classList.toggle('is-open');
			toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
		});
	});
})();

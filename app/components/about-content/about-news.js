/**
 * Бегущая строка в секции «Новости»: бесшовное движение справа налево.
 */
(function () {
	const wrap = document.querySelector('.news-ticker__wrap');
	const text = document.querySelector('.news-ticker__text');
	if (!wrap || !text) return;

	function startTicker() {
		if (typeof gsap === 'undefined') return;

		const wrapWidth = wrap.offsetWidth;
		const base = (text.dataset.tickerText || text.textContent || '').trim();
		if (!wrapWidth || !base) return;

		text.dataset.tickerText = base;

		let segment = base;
		text.textContent = segment;

		while (text.scrollWidth < wrapWidth + 80) {
			segment += '   ' + base;
			text.textContent = segment;
		}

		const loopSegment = segment + '   ';
		text.textContent = loopSegment + loopSegment;

		const segmentWidth = text.scrollWidth / 2;
		if (segmentWidth <= 0) return;

		gsap.set(text, { x: 0 });
		gsap.to(text, {
			x: -segmentWidth,
			duration: Math.max(12, segmentWidth / 90),
			ease: 'none',
			repeat: -1
		});
	}

	function run() {
		// GSAP подключается из CDN после бандла — ждём появления
		if (typeof gsap !== 'undefined') {
			requestAnimationFrame(function () {
				requestAnimationFrame(startTicker);
			});
			return;
		}
		var attempts = 0;
		var t = setInterval(function () {
			attempts++;
			if (typeof gsap !== 'undefined') {
				clearInterval(t);
				requestAnimationFrame(function () {
					requestAnimationFrame(startTicker);
				});
			} else if (attempts > 50) {
				clearInterval(t);
			}
		}, 100);
	}

	if (document.readyState === 'complete') {
		run();
	} else {
		window.addEventListener('load', run);
	}
})();

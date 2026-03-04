/**
 * Бегущая строка в секции «Новости»: плавно вперёд, потом назад (не бесконечная в одну сторону).
 */
(function () {
	const wrap = document.querySelector('.news-ticker__wrap');
	const text = document.querySelector('.news-ticker__text');
	if (!wrap || !text) return;

	function startTicker() {
		if (typeof gsap === 'undefined') return;

		// Измеряем после отрисовки (шрифты и ширина контейнера уже есть)
		const wrapWidth = wrap.offsetWidth;
		let textWidth = text.scrollWidth;

		// Если текст короче видимой области — дублируем содержимое, чтобы была прокрутка
		if (textWidth <= wrapWidth && text.textContent) {
			const base = text.textContent.trim();
			while (text.scrollWidth <= wrapWidth * 1.5) {
				text.textContent += '  ' + base;
			}
			textWidth = text.scrollWidth;
		}

		const distance = Math.max(0, textWidth - wrapWidth);
		if (distance <= 0) return;

		gsap.set(text, { x: 0 });
		const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.5 });
		tl.to(text, {
			x: -distance,
			duration: 12,
			ease: 'none'
		}).to(text, {
			x: 0,
			duration: 12,
			ease: 'none'
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

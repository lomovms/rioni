(function () {
	const block = document.querySelector('.hero-about');
	if (!block) return;

	function run() {
		if (typeof gsap === 'undefined') return;

		const stairs = block.querySelectorAll('.hero-about__stair');
		const content = block.querySelector('.hero-about__content');

		// Начальное состояние: ступеньки снизу (под картинкой), текст невидим
		gsap.set(stairs, { y: '100%', opacity: 0 });
		if (content) gsap.set(content, { opacity: 0 });

		const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

		// Сначала появляется текст
		if (content) {
			tl.to(content, { opacity: 1, duration: 0.8 });
		}

		// Ступеньки выезжают снизу по очереди (из‑под нижней картинки)
		tl.to(stairs, {
			y: 0,
			opacity: 1,
			duration: 0.9,
			stagger: 0.12,
			ease: 'power3.out'
		}, content ? '-=0.4' : 0);
	}

	if (document.readyState === 'complete') {
		run();
	} else {
		window.addEventListener('load', run);
	}
})();

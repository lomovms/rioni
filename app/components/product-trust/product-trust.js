export default function initProductTrust() {
	document.querySelectorAll('[data-product-trust]').forEach(function (slider) {
		var track = slider.querySelector('[data-product-trust-track]');
		var cards = track ? track.children : [];
		var prev = slider.querySelector('[data-product-trust-prev]');
		var next = slider.querySelector('[data-product-trust-next]');
		var index = 0;

		if (!track || cards.length < 2 || !prev || !next) return;

		function update() {
			track.style.transform = 'translateX(-' + (index * 100) + '%)';
			prev.disabled = index === 0;
			next.disabled = index === cards.length - 1;
		}

		prev.addEventListener('click', function () {
			index = Math.max(0, index - 1);
			update();
		});

		next.addEventListener('click', function () {
			index = Math.min(cards.length - 1, index + 1);
			update();
		});

		update();
	});
}

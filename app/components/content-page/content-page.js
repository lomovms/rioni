export default function initContentToc() {
	document.querySelectorAll('[data-content-toc]').forEach(function (toc) {
		var links = Array.prototype.slice.call(toc.querySelectorAll('.content-toc__list a'));
		var toggle = toc.querySelector('[data-content-toc-toggle]');
		var current = toc.querySelector('[data-content-toc-current]');
		var prev = toc.querySelector('[data-content-toc-prev]');
		var next = toc.querySelector('[data-content-toc-next]');
		var prevLabel = toc.querySelector('[data-content-toc-prev-label]');
		var nextLabel = toc.querySelector('[data-content-toc-next-label]');
		var index = Number(toc.getAttribute('data-content-toc-current')) || 0;

		if (!links.length || !toggle || !current || !prev || !next) return;

		index = Math.max(0, Math.min(index, links.length - 1));

		function updateLink(link, label, itemIndex) {
			var item = links[itemIndex];
			link.toggleAttribute('href', Boolean(item));
			link.setAttribute('aria-disabled', String(!item));
			label.textContent = item ? 'Глава ' + (itemIndex + 1) : '';
			if (item) link.setAttribute('href', item.getAttribute('href'));
		}

		function update() {
			links.forEach(function (link, itemIndex) {
				link.classList.toggle('is-current', itemIndex === index);
			});
			current.textContent = 'Глава ' + (index + 1) + '. ' + links[index].textContent;
			updateLink(prev, prevLabel, index ? index - 1 : null);
			updateLink(next, nextLabel, index < links.length - 1 ? index + 1 : null);
		}

		toggle.addEventListener('click', function () {
			var opened = toc.classList.toggle('is-open');
			toggle.setAttribute('aria-expanded', String(opened));
		});

		update();
	});
}

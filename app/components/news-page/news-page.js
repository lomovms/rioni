import Masonry from 'masonry-layout';
import imagesLoaded from 'imagesloaded';

(function () {
	function initNewsPageMore() {
	var cardsWrap = document.querySelector('[data-news-page-cards]') || document.querySelector('.news-page__cards');
	var masonryWrap = document.querySelector('[data-news-page-masonry]')
		|| document.querySelector('[data-memes-container]')
		|| document.querySelector('.news-page__masonry');
	var buttons = document.querySelectorAll('[data-news-page-more]');
	var masonry = null;
	var masonryObserver = null;

	function getMasonryGutter() {
		return window.matchMedia('(max-width: 767px)').matches ? 12 : 16;
	}

	function layoutMasonry(reloadItems, pendingItems) {
		if (!masonryWrap) return;

		if (!masonry) {
			masonry = new Masonry(masonryWrap, {
				itemSelector: '.news-meme-card',
				columnWidth: '.news-meme-card',
				gutter: getMasonryGutter(),
				percentPosition: true,
				transitionDuration: 0
			});
		} else {
			masonry.options.gutter = getMasonryGutter();
			if (reloadItems) masonry.reloadItems();
			masonry.layout();
		}

		masonryWrap.classList.remove('is-loading');
		masonryWrap.classList.add('is-ready');

		if (pendingItems && pendingItems.length) {
			requestAnimationFrame(function () {
				pendingItems.forEach(function (item) {
					item.classList.remove('is-masonry-pending');
				});
			});
		}
	}

	if (masonryWrap) {
		masonryWrap.classList.add('is-loading');

		Array.prototype.forEach.call(masonryWrap.querySelectorAll('img'), function (image) {
			image.loading = 'eager';
		});

		var loader = imagesLoaded(masonryWrap);
		loader.on('progress', function () {
			if (masonry) masonry.layout();
		});
		loader.on('always', function () {
			layoutMasonry(true);
		});

		window.addEventListener('resize', function () {
			layoutMasonry(false);
		});

		masonryObserver = new MutationObserver(function (mutations) {
			var newCards = [];

			mutations.forEach(function (mutation) {
				Array.prototype.forEach.call(mutation.addedNodes, function (node) {
					if (node.nodeType !== 1) return;

					if (node.matches('.news-meme-card')) newCards.push(node);
					newCards = newCards.concat(Array.prototype.slice.call(node.querySelectorAll('.news-meme-card')));
				});
			});

			if (!newCards.length) return;

			newCards.forEach(function (card) {
				card.classList.add('is-masonry-pending');
			});
			Array.prototype.forEach.call(newCards, function (card) {
				var image = card.querySelector('img');
				if (!image) return;
				image.loading = 'eager';
			});

			imagesLoaded(newCards, function () {
				layoutMasonry(true, newCards);
			});
		});

		masonryObserver.observe(masonryWrap, { childList: true });
	}

	buttons.forEach(function (button) {
		button.addEventListener('click', function () {
			var type = button.getAttribute('data-news-page-more');
			var target = type === 'memes' ? masonryWrap : cardsWrap;
			var pendingItems = [];
			if (!target) return;

			if (type === 'memes') {
				pendingItems = Array.prototype.slice.call(
					masonryWrap.querySelectorAll('.news-meme-card--extra')
				);
				pendingItems.forEach(function (item) {
					item.classList.add('is-masonry-pending');
				});
			}

			target.classList.add('is-expanded');
			button.classList.add('is-hidden');

			if (type === 'memes') {
				requestAnimationFrame(function () {
					imagesLoaded(pendingItems, function () {
						layoutMasonry(true, pendingItems);
					});
				});
			}
		});
	});
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', initNewsPageMore, { once: true });
	} else {
		initNewsPageMore();
	}
})();

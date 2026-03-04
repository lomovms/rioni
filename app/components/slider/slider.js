
import Swiper from 'swiper';

class Slider {

	constructor() {
		this.initialize();
	}

	initialize() {
		let slider = $('[data-slider]');

		slider.each(function() {
			var el = $(this);
			var pagination = el.find('.swiper-pagination');
			var prev = el.find('.swiper-button-next');
			var next = el.find('.swiper-button-prev');
			var scrollbar = el.find('.swiper-scrollbar');
			var loop = Boolean(el.attr('data-loop')) || false;                // зацикливание
			var slidesPerView = el.attr('data-count') || 1;                   // количество слайдов
			var spaceBetween = 0;                                             // расстояние между слайдами
			var freeMode = Boolean(el.attr('data-freeMode')) || false;        // свободное перетаскивание
			var centeredSlides = Boolean(el.attr('data-centered')) || false;  // центирование слайдов
			var slidesPerColumn = el.attr('data-column') || 1;                // слайды в колонках

			if (slidesPerView > 0) {
				spaceBetween = 30;
			}

			new Swiper(el, {
				loop: loop,
				slidesPerView: slidesPerView,
				spaceBetween: spaceBetween,
				freeMode: freeMode,
				centeredSlides: centeredSlides,
				slidesPerColumn: slidesPerColumn,

				// If we need pagination
				pagination: {
					el: pagination
				},

				// Navigation arrows
				navigation: {
					nextEl: prev,
					prevEl: next
				},

				// And if we need scrollbar
				scrollbar: {
					el: scrollbar
				}
			});
		});
	}
}

 new Slider();

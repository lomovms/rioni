class Menu {

	constructor() {
		this.scrollto = $('[data-scroll-to]');
		this.scrolltoSingle = $('[data-scroll-to-single]');
		this.initialize();
	}

	initialize() {

		// Если существует меню со ссылками якорями
		if (this.scrollto.length) {
			this.scrollto.each(function() {
				var nav = $(this);
				var el = nav.find('a');

				el.click(function(e) {
					var el = $(this);
					scrollEl(el, e);
				});
			});
		}

		// Отдельная ссылка - якорь к блоку
		if (this.scrolltoSingle.length) {
			this.scrolltoSingle.click(function(e) {
				var el = $(this);
				scrollEl(el, e);
			});
		}

		function scrollEl(el, e) {
			var target = el.attr('href');
			var partTop = $(target).offset().top;

			$('html, body').animate({scrollTop: partTop + 'px'}, 500);

			e.preventDefault();
		}

		// открытие выезжающего меню
		$('[data-menu-fixed]').find('a').click(function(e) {
			let el = $(this);
			let list = el.next();

			if (list.length) {
				list.addClass('active');

				e.preventDefault();
			}
		});

		// Кнопка назад в меню
		$('[data-menu-back]').click(function(e) {
			let el = $(this);
			let list = el.parent();

			list.toggleClass('active');

			e.preventDefault();
		});
	}
}

 new Menu();

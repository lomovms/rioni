class Tabs {

	constructor() {
		this.tabsHead = $('[data-tabs-head]');
		this.initialize();
	}

	initialize() {
		let tabsHead = this.tabsHead;

		tabsHead.each(function() {
			let el = $(this);

			let tabsLink = el.children();
			let tabsBody = el.next();
			let tabsItem = tabsBody.children();

			tabsLink.click(function(e) {
				let el = $(this);
				let index = el.index();

				let map =tabsItem.eq(index).find('[data-map]'),
					mapSingle = tabsItem.eq(index).find('[data-map-single]');

				// карта с множеством меток
				map.each(function (index, el) {
					let load = $(el).attr('data-map');

					if (load == 'load') {
						$(el).attr('data-map', '');

						Window.loadMap($(el), true, 'init');
					}
				});

				// карта с одной меткой
				mapSingle.each(function (index, el) {
					let load = $(el).attr('data-map-single');

					if (load == 'load') {
						$(el).attr('data-map-single', '');

						Window.loadMap($(el), true, 'initSingle');
					}
				});

				tabsLink.removeClass('active');
				el.addClass('active');

				tabsItem.removeClass('active');
				tabsItem.eq(index).addClass('active');

				e.preventDefault();
			});
		});
	}
}

 new Tabs();

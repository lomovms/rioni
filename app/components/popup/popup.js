import 'magnific-popup';

class Popup {

	constructor() {
		this.initialize();
	}

	initialize() {
		let popup = $('[data-popup]');
		let popupImg = $('[data-popup-img]');

		popupImg.magnificPopup({
			type:'image',
			image: {
				markup: '<div class="mfp-figure popup--figure mfp-with-anim">'+
						'<button title="%title%" type="button" class="mfp-close popup__close"></button>'+
						'<div class="mfp-img"></div>'+
						'<div class="mfp-bottom-bar">'+
						'<div class="mfp-title"></div>'+
						'<div class="mfp-counter"></div>'+
						'</div>'+
						'</div>', // Popup HTML markup. `.mfp-img` div will be replaced with img tag, `.mfp-close` by close button

				cursor: 'mfp-zoom-out-cur', // Class that adds zoom cursor, will be added to body. Set to null to disable zoom out cursor.

				titleSrc: 'title', // Attribute of the target element that contains caption for the slide.
				// Or the function that should return the title. For example:
				// titleSrc: function(item) {
				//   return item.el.attr('title') + '<small>by Marsel Van Oosten</small>';
				// }

				verticalFit: true, // Fits image in area vertically

				tError: '<a href="%url%">The image</a> could not be loaded.' // Error message
			},
			callbacks: {
                beforeOpen: function() {
                    this.st.mainClass = 'mfp-zoom-in';
                }
            }
		});

		popup.magnificPopup({
			type:'inline',
			midClick: true,
            closeMarkup: '<button title="%title%" type="button" class="mfp-close popup__close"></button>',
            removalDelay: 500, //delay removal by X to allow out-animation
            callbacks: {
                beforeOpen: function() {
					this.st.mainClass = 'mfp-zoom-in';
                },
				open: function() {
					// загружаем карты, если они есть во всплывающих окнах
					let mp = $.magnificPopup.instance,
						id = $(mp.currItem.el[0]).attr('href');

					let map = $(id).find('[data-map]'),
						mapSingle = $(id).find('[data-map-single]');

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
				}
            }
		});
	}
}

new Popup();

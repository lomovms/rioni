import 'magnific-popup';

(function patchMfpRaceCondition() {
	var proto = $.magnificPopup.proto;
	var pendingCloseTimer = null;

	var origClose = proto.close;
	proto.close = function () {
		var inst = $.magnificPopup.instance;
		if (!inst || !inst.isOpen) return;

		if (pendingCloseTimer) {
			clearTimeout(pendingCloseTimer);
			pendingCloseTimer = null;
		}

		inst.isOpen = false;

		if (inst.st.removalDelay && !inst.isLowIE && inst.supportsTransition) {
			inst._addClassToMFP('mfp-removing');
			pendingCloseTimer = setTimeout(function () {
				pendingCloseTimer = null;
				inst._close();
			}, inst.st.removalDelay);
		} else {
			inst._close();
		}
	};

	var origOpen = proto.open;
	proto.open = function (data) {
		if (pendingCloseTimer) {
			clearTimeout(pendingCloseTimer);
			pendingCloseTimer = null;
			var inst = $.magnificPopup.instance;
			if (inst) inst._close();
		}
		return origOpen.apply(this, arguments);
	};
})();

class Popup {

	constructor() {
		$(document).ready(() => this.initialize());
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
					let mp = $.magnificPopup.instance;
					let href = (mp.currItem.el && mp.currItem.el[0] && $(mp.currItem.el[0]).attr('href')) || mp.currItem.src || '';
					if (href && href.indexOf('#') === 0) {
						let el = document.getElementById(href.slice(1));
						if (el) el.setAttribute('aria-hidden', 'false');
					}
					if (href === '#registration-form') {
						document.dispatchEvent(new CustomEvent('rioni:registration-form-opened'));
					}
					// загружаем карты, если они есть во всплывающих окнах
					let map = $(href).find('[data-map]'),
						mapSingle = $(href).find('[data-map-single]');
					map.each(function (index, el) {
						let load = $(el).attr('data-map');
						if (load == 'load') {
							$(el).attr('data-map', '');
							if (typeof Window !== 'undefined' && Window.loadMap) Window.loadMap($(el), true, 'init');
						}
					});
					mapSingle.each(function (index, el) {
						let load = $(el).attr('data-map-single');
						if (load == 'load') {
							$(el).attr('data-map-single', '');
							if (typeof Window !== 'undefined' && Window.loadMap) Window.loadMap($(el), true, 'initSingle');
						}
					});
				},
				afterClose: function() {
					if (!this.currItem) return;
					let href = (this.currItem.el && this.currItem.el[0] && $(this.currItem.el[0]).attr('href')) || this.currItem.src || '';
					if (href && href.indexOf('#') === 0) {
						let el = document.getElementById(href.slice(1));
						if (el) el.setAttribute('aria-hidden', 'true');
					}
				}
            }
		});
	}
}

new Popup();

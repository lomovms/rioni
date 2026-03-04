import noUiSlider from 'nouislider';
import wNumb from 'wnumb';

class PriceSlider {

	constructor() {
		this.initialize();
	}

	initialize() {
		var range = $('[data-price-slider]');

		range.each(function() {
			var el = $(this);
			var id = el.attr('id');
			var min = parseInt(el.attr('data-min')) || 0;
			var max = parseInt(el.attr('data-max')) || 100;
			var startMin = parseInt(el.attr('data-start-min')) || min;
			var startMax = parseInt(el.attr('data-start-max')) || max;
			var connect = Boolean(el.attr('data-connect')) || false;
			var slider = document.getElementById(id);
			var dataInputs = Boolean(el.attr('data-inputs'));
			var dataValues = Boolean(el.attr('data-values'));
			var tooltips = Boolean(el.attr('data-tooltips')) || false;
			var tooltip = false;

			if (tooltips) {
				tooltip = wNumb({decimals: 0});
			}

			if (dataInputs) {
				var inputs = [
					document.getElementById(id + '-min'),
					document.getElementById(id + '-max')
				];
			}

			if (dataValues) {
				var skipValues = [
					document.getElementById(id + '-val-min'),
					document.getElementById(id + '-val-max')
				];
			}

			noUiSlider.create(slider, {
				start: [startMin, startMax],
				connect: connect,
				range: {
					'min': min,
					'max': max
				},
				format: wNumb({
					decimals: 0
				}),
				tooltips: [tooltip, tooltip]
			});

			slider.noUiSlider.on('update', function (values, handle) {
				if (dataInputs) {
					inputs[handle].value = values[handle];
				}

				if (dataValues) {
					skipValues[handle].innerHTML = values[handle];
				}
			});

			if (dataInputs) {
				inputs.forEach((input, handle) => {
					input.addEventListener('change', function () {
						slider.noUiSlider.setHandle(handle, this.value);
					});
				});
			}
		});
	}
}

new PriceSlider();

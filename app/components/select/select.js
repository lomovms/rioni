import 'sumoselect';

class Select {

	constructor() {
		this.initialize();
	}

	initialize() {
		$('select').not('[data-country-select]').each(function() {
			var el = $(this);
			var search = Boolean(el.attr('data-search')) || false;
			var placeholder = el.attr('data-placeholder') || 'This is a placeholder';
			var okCancel = Boolean(el.attr('data-okCancel')) || false;
			var selectAll = Boolean(el.attr('data-selectAll')) || false;

			el.SumoSelect({
				search: search,
				searchText: 'Введите текст',
				placeholder: placeholder,
				okCancelInMulti: okCancel,
				selectAll: selectAll,
				forceCustomRendering: false // включает на мобильных стандартный селект
			});

			el.on('sumo:opening', function() {
				$(this).closest('.SumoSelect').find('.optWrapper li').each(function() {
					// $(this).find('i').remove();
					// $(this).prepend('<i class="fas fa-band-aid"></i>');
				})
			})
		});
	}
}

new Select();

import '../../assets/js/libs/jquery.mockjax';
import '../../assets/js/libs/jquery.autocomplete';
import '../../assets/js/libs/countries';
import '../../assets/js/libs/teams';

class Autocomplete {

	constructor() {
		this.initialize();
	}

	initialize() {
		var autocomplete = $('[data-autocomplete]');

		autocomplete.each(function() {
			var el = $(this);
			var array = el.attr('data-array');
			var listArray;

			var input = el.find('[data-autocomplete-front]');
			var inputBack = el.find('[data-autocomplete-back]');
			var res = el.parent().find('[data-autocomplete-res]');

			if (array == 'countries') {
				listArray = $.map(eval(array), function (value, key) { return { value: value, data: key }; });

				// Setup jQuery ajax mock:
				$.mockjax({
					url: '*',
					responseTime: 2000,
					response: function (settings) {
						var query = settings.data.query,
							queryLowerCase = query.toLowerCase(),
							re = new RegExp('\\b' + $.Autocomplete.utils.escapeRegExChars(queryLowerCase), 'gi'),
							suggestions = $.grep(listArray, function (country) {
								// return country.value.toLowerCase().indexOf(queryLowerCase) === 0;
								return re.test(country.value);
							}),
							response = {
								query: query,
								suggestions: suggestions
							};

						this.responseText = JSON.stringify(response);
					}
				});
			} else {
				listArray = eval(array);
			}

			// Initialize autocomplete with local lookup
			if (el.attr('data-autocomplete') == 'local') {
				input.devbridgeAutocomplete({
					lookup: listArray,
					minChars: 1,
					onSelect: function (suggestion) {
						res.html('You selected: ' + suggestion.value + ', ' + suggestion.data.category);
					},
					showNoSuggestionNotice: true,
					noSuggestionNotice: 'Sorry, no matching results',
					groupBy: 'category'
				});
			} else {
				// // Initialize ajax autocomplete
				input.autocomplete({
					// serviceUrl: '/autosuggest/service/url',
					lookup: listArray,
					lookupFilter: function(suggestion, originalQuery, queryLowerCase) {
						var re = new RegExp('\\b' + $.Autocomplete.utils.escapeRegExChars(queryLowerCase), 'gi');
						return re.test(suggestion.value);
					},
					onSelect: function(suggestion) {
						res.html('You selected: ' + suggestion.value + ', ' + suggestion.data);
					},
					onHint: function (hint) {
						inputBack.val(hint);
					},
					onInvalidateSelection: function() {
						res.html('You selected: none');
					}
				});
			}
		});


	}
}

new Autocomplete();

class City {

	constructor() {
		this.initialize();
	}

	initialize() {
		ymaps.ready(function() {
			let city = $('[data-city]');
			let country = city.parent().children('[data-city-country]');
			let region =  city.parent().children('[data-city-region]');

			if (typeof ymaps.geolocation.country != "undefined") {
				country.text(ymaps.geolocation.country);
			} else {
				country.text('Не удалось получить города');
			}

			if (typeof ymaps.geolocation.region != "undefined") {
				region.text(ymaps.geolocation.region);
			} else {
				region.text('Не удалось получить регион или область');
			}

			if (typeof ymaps.geolocation.city != "undefined") {
				city.text(ymaps.geolocation.city);
			} else {
				city.text('Не удалось получить город');
			}
		});
	}
}

new City();

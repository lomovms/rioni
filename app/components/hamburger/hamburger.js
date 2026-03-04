class Hamburger {

	constructor() {
		this.initialize();
	}

	initialize() {
		let hamburger = $('[data-hamburger]');

		hamburger.click(function() {
			let el = $('[data-menu-fixed]');

			el.toggleClass('active');
		});
	}
}

new Hamburger();

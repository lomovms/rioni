import tooltipster from 'tooltipster';

class Tooltip {

	constructor() {
		this.initialize();
	}

	initialize() {

		$('[data-tooltip]').tooltipster({
			theme: 'tooltipster-shadow'
		});

		// tooltip вызываемый для html контента
		$('[data-tooltip-content]').tooltipster({
			animation: 'fade',
			delay: 200,
			theme: 'tooltipster-shadow',
			trigger: 'click',
			side: 'bottom'
		});

		Window.tooltipster = tooltipster;
	}
}

new Tooltip();

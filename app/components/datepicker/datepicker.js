import 'moment';
import '../../assets/js/libs/jquery.daterangepicker.js';

(function() {
	let datepicker = $('[data-datepicker]');

	datepicker.each(function() {
		let el = $(this);

		let autoClose = (el.data('auto-close') != undefined) ? Boolean(el.data('auto-close')) : true;
		let singleDate = (el.data('single-date') != undefined) ? Boolean(el.data('single-date')) : true;
		let showShortcuts = (el.data('show-shortcuts') != undefined) ? Boolean(el.data('show-shortcuts')) : false;
		let singleMonth = (el.data('single-month') != undefined) ? Boolean(el.data('single-month')) : true;
		let maxDays = (el.data('max-days') != undefined) ? parseInt(el.data('max-days')) : 0;
		let minDays = (el.data('min-days') != undefined) ? parseInt(el.data('min-days')) : 0;
		let startDate = (el.data('start-date') != undefined) ? new Date(el.data('start-date')) : false;
		let endDate = (el.data('end-date') != undefined) ? new Date(el.data('end-date')) : startDate;
		let inline = (el.data('inline') != undefined) ? Boolean(el.data('inline')) : false;
		let alwaysOpen = inline;
		let showTopbar = (el.data('show-topbar') != undefined) ? Boolean(el.data('show-topbar')) : false;
		let monthSelect = (el.data('month-select') != undefined) ? Boolean(el.data('month-select')) : false;
		let yearSelect = (el.data('year-select') != undefined) ? Boolean(el.data('year-select')) : false;
		let container = (el.data('container') != undefined) ? el.data('container') : 'body';

		el.dateRangePicker({
			autoClose: autoClose,
			singleDate : singleDate,
			showShortcuts: showShortcuts,
			singleMonth: singleMonth,
			maxDays: maxDays,
			minDays: minDays,
			startDate: startDate,
			endDate: endDate,
			startOfWeek: 'monday',
			inline: inline,
			container: container,
			alwaysOpen: alwaysOpen,
			showTopbar: showTopbar,
			monthSelect: monthSelect,
			yearSelect: yearSelect
		})
		// .on('datepicker-first-date-selected', function(event, obj) {
		// 	/* This event will be triggered when first date is selected */
		// 	// console.log('first-date-selected',obj);
		// 	// obj will be something like this:
		// 	// {
		// 	// 		date1: (Date object of the earlier date)
		// 	// }
		// })
		// .on('datepicker-change',function(event,obj) {
		// 	/* This event will be triggered when second date is selected */
		// 	// console.log('change',obj);
		// 	// obj will be something like this:
		// 	// {
		// 	// 		date1: (Date object of the earlier date),
		// 	// 		date2: (Date object of the later date),
		// 	//	 	value: "2013-06-05 to 2013-06-07"
		// 	// }
		// })
		// .on('datepicker-apply',function(event,obj) {
		// 	/* This event will be triggered when user clicks on the apply button */
		// 	// console.log('apply',obj);
		// })
		// .on('datepicker-close',function() {
		// 	/* This event will be triggered before date range picker close animation */
		// 	// console.log('before close');
		// })
		// .on('datepicker-closed',function() {
		// 	/* This event will be triggered after date range picker close animation */
		// 	// console.log('after close');
		// })
		// .on('datepicker-open',function() {
		// 	/* This event will be triggered before date range picker open animation */
		// 	// console.log('before open');
		// })
		// .on('datepicker-opened',function() {
		// 	/* This event will be triggered after date range picker open animation */
		// 	// console.log('after open');
		// });
	});
})();

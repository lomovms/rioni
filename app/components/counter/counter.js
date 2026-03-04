class Counter {

	constructor() {
		this.counter = $('[data-counter]');
		this.initialize();
	}

	initialize() {
		this.counter.each(function() {
            let counter = $(this);
            let input = counter.find("[data-counter-input]");
            let minus = counter.find("[data-counter-min]");
            let plus = counter.find("[data-counter-max]");

            let min = parseInt(input.attr('min'));
            let max = parseInt(input.attr('max'));

            plus.click(function add() {
                let $input = input;
				let a = $input.val();

                if (a < max) {
                    a++;
                }

                minus.attr("disabled", !a);
                $input.val(a);
            });

            minus.attr("disabled", !input);

            minus.click(function minusButton() {
                let $input = input;
                let b = $input.val();
                if (b > min) {
                    b--;
                    $input.val(b);
                } else {
                    minus.attr("disabled", true);
                }
            });

            input.on('change keyup focus', function() {
                let removeLetters = $(this).val().replace(/[^0-9]/g, '');
                $(this).val(removeLetters);
            });
        });
	}
}

 new Counter();

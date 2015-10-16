describe('Accordion directive in mode "solo"', function() {

	var dl, dt, dd;

	beforeEach(function() {
		browser.get('http://localhost:8080/');
	});

	beforeEach(function() {
		// make initial selections
		dl = element(by.css('dl[mode="solo"]'));
		dt = element.all(by.css('dl[mode="solo"] dt'));  // will generate an array, so need to use .first()
		dd = element.all(by.css('dl[mode="solo"] dd'));  // will generate an array, so need to use .first()
	});

	it('should initially set all except first item to be in "closed" state.', function() {
		dt.each(function(elem, index) {
			var sibling_dd = elem.element(by.xpath('following-sibling::dd[1]'));
			if (index) {
				// check the class of the <dt>
				expect(elem.getAttribute('class')).not.toMatch('open');
				expect(elem.getAttribute('class')).toMatch('closed');

				// check the class of the sibling <dd>
				expect(sibling_dd.getAttribute('class')).toMatch('hidden');
			} else {
				// check the class of the <dt>
				expect(elem.getAttribute('class')).not.toMatch('closed');
				expect(elem.getAttribute('class')).toMatch('open');

				// check the class of the sibling <dd>
				expect(sibling_dd.getAttribute('class')).not.toMatch('hidden');
			}
		});
	});

});

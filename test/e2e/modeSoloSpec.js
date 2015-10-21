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

	it('should only allow one item to be open at a time.', function() {
		// click the second <dt> tag
		dt.get(1).click();
		// check title class
		expect(dt.get(1).getAttribute('class')).toMatch('open');
		// check description class
		expect(dd.get(1).getAttribute('class')).not.toMatch('hidden');

		// check title class
		expect(dt.get(2).getAttribute('class')).toMatch('closed');
		// check description class
		expect(dd.get(2).getAttribute('class')).toMatch('hidden');

		// check title class
		expect(dt.get(0).getAttribute('class')).toMatch('closed');
		// check description class
		expect(dd.get(0).getAttribute('class')).toMatch('hidden');


		// click the second <dt> tag
		dt.get(2).click();
		// check title class
		expect(dt.get(2).getAttribute('class')).toMatch('open');
		// check description class
		expect(dd.get(2).getAttribute('class')).not.toMatch('hidden');

		// check title class
		expect(dt.get(1).getAttribute('class')).toMatch('closed');
		// check description class
		expect(dd.get(1).getAttribute('class')).toMatch('hidden');

		// check title class
		expect(dt.get(0).getAttribute('class')).toMatch('closed');
		// check description class
		expect(dd.get(0).getAttribute('class')).toMatch('hidden');
	});

});

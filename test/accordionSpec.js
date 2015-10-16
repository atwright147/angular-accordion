describe('Accordion directive', function() {

	beforeEach(function() {
		browser.get('http://localhost:8080/');
	});

	it('should initially set first <dt> & <dl> class to be in open state for dl[mode="first"]', function() {
		// make initial selections
		var dl = element(by.css('dl[mode="first"]'));
		var dt = element.all(by.css('dl[mode="first"] dt'));  // will generate an array, so need to use .first()
		var dd = element.all(by.css('dl[mode="first"] dd'));  // will generate an array, so need to use .first()
		
		// check title class
		expect(dt.first().getAttribute('class')).not.toMatch('closed');
		expect(dt.first().getAttribute('class')).toMatch('open');
		
		// check description class
		expect(dd.first().getAttribute('class')).not.toMatch('hidden');
	});

		dt.click();
		// check title class
		expect(dt.getAttribute('class')).not.toMatch('open');
		expect(dt.getAttribute('class')).toMatch('closed');
		// check description class
		expect(dd.getAttribute('class')).toMatch('hidden');
	});

});

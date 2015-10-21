describe('Accordion directive in mode "first"', function() {

	var dl, dt, dd;

	beforeEach(function() {
		browser.get('http://localhost:8080/');
	});

	beforeEach(function() {
		// make initial selections
		dl = element(by.css('dl[mode="first"]'));
		dt = element.all(by.css('dl[mode="first"] dt'));  // will generate an array, so need to use .first()
		dd = element.all(by.css('dl[mode="first"] dd'));  // will generate an array, so need to use .first()
	});

	it('should initially set first <dt> & <dl> class to be in open state.', function() {		
		// check title class
		expect(dt.first().getAttribute('class')).not.toMatch('closed');
		expect(dt.first().getAttribute('class')).toMatch('open');

		// check description class
		expect(dd.first().getAttribute('class')).not.toMatch('hidden');
	});

	it('should initially set second++ <dt>s & <dl>s class to be in closed state.', function() {		
		/* second item */
		// check title class
		expect(dt.get(1).getAttribute('class')).not.toMatch('open');
		expect(dt.get(1).getAttribute('class')).toMatch('closed');

		// check description class
		expect(dd.get(1).getAttribute('class')).toMatch('hidden');
		
		/* third item */
		// check title class
		expect(dt.get(2).getAttribute('class')).not.toMatch('open');
		expect(dt.get(2).getAttribute('class')).toMatch('closed');

		// check description class
		expect(dd.get(2).getAttribute('class')).toMatch('hidden');
	});

	it('should change css classes of target <dt> and child <dd> to inverse of current when target <dt> is clicked.', function() {
		// click the first <dt> tag
		dt.first().click();
		// check title class
		expect(dt.first().getAttribute('class')).not.toMatch('open');
		expect(dt.first().getAttribute('class')).toMatch('closed');
		// check description class
		expect(dd.first().getAttribute('class')).toMatch('hidden');


		// click the second <dt> tag
		dt.get(1).click();
		// check title class
		expect(dt.get(1).getAttribute('class')).not.toMatch('closed');
		expect(dt.get(1).getAttribute('class')).toMatch('open');
		// check description class
		expect(dd.get(1).getAttribute('class')).not.toMatch('hidden');


		// click the third <dt> tag
		dt.get(2).click();
		// check title class
		expect(dt.get(2).getAttribute('class')).not.toMatch('closed');
		expect(dt.get(2).getAttribute('class')).toMatch('open');
		// check description class
		expect(dd.get(2).getAttribute('class')).not.toMatch('hidden');
	});

});

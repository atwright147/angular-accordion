describe('Accordion directive in mode "hash"', function() {

	var dl, dt, dd;

	beforeEach(function() {
		browser.get('http://localhost:8080#hashdemo');
	});

	beforeEach(function() {
		// make initial selections
		dl = element(by.css('dl[mode="hash"]'));
		dt = element.all(by.css('dl[mode="hash"] dt'));  // will generate an array, so need to use .first()
		dd = element.all(by.css('dl[mode="hash"] dd'));  // will generate an array, so need to use .first()
	});

	it('should initially set <dt> with class equal to hash & sibling <dl> class to be in open state.', function() {
		var open_dt = element(by.css('dl[mode="hash"] dt.hashdemo'));
		var open_dd = open_dt.element(by.xpath('following-sibling::dd[1]'));

		// check title class
		expect(open_dt.getAttribute('class')).not.toMatch('closed');
		expect(open_dt.getAttribute('class')).toMatch('open');

		// check description class
		expect(open_dd.getAttribute('class')).not.toMatch('hidden');
	});

	it('should initially set <dt>s & <dl>s without class matching the url hash to be in closed state.', function() {	
		// second item
		// check title class
		expect(dt.get(0).getAttribute('class')).not.toMatch('open');
		expect(dt.get(0).getAttribute('class')).toMatch('closed');

		// check description class
		expect(dd.get(0).getAttribute('class')).toMatch('hidden');
		
		// third item
		// check title class
		expect(dt.get(1).getAttribute('class')).not.toMatch('open');
		expect(dt.get(1).getAttribute('class')).toMatch('closed');

		// check description class
		expect(dd.get(1).getAttribute('class')).toMatch('hidden');
	});

	it('should change css classes of target <dt> and child <dd> to inverse of current when target <dt> is clicked.', function() {
		// click the first <dt> tag
		dt.get(0).click();
		// check title class
		expect(dt.get(0).getAttribute('class')).not.toMatch('closed');
		expect(dt.get(0).getAttribute('class')).toMatch('open');
		// check description class
		expect(dd.get(0).getAttribute('class')).not.toMatch('hidden');


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
		expect(dt.get(2).getAttribute('class')).not.toMatch('open');
		expect(dt.get(2).getAttribute('class')).toMatch('closed');
		// check description class
		expect(dd.get(2).getAttribute('class')).toMatch('hidden');
	});

});

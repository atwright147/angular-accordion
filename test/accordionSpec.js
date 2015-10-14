describe('Accordion directive', function() {

	beforeEach(function() {
		browser.get('http://localhost:8080/');
	});

	it('should have the right page title', function() {
		expect(browser.getTitle()).toEqual('Accordion Demo');
	});

	it('should allow clicking the first <dt>', function() {
		var dt = element.all(by.tagName('dt')).first();
		var dd = dt.element(by.xpath('following-sibling::dd[1]'));
		
		// check title class
		expect(dt.getAttribute('class')).not.toMatch('closed');
		expect(dt.getAttribute('class')).toMatch('open');
		// check description class
		expect(dd.getAttribute('class')).not.toMatch('hidden');
		dt.click();
		// check title class
		expect(dt.getAttribute('class')).not.toMatch('open');
		expect(dt.getAttribute('class')).toMatch('closed');
		// check description class
		expect(dd.getAttribute('class')).toMatch('hidden');
	});

});

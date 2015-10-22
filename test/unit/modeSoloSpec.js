(function() {
	'use strict';

	describe('Accordion with mode set to "solo"', function () {
		var el, $compile, $rootScope, $scope;
		var dt, dd, clickEvent;

		beforeEach(module('app'));

		beforeEach(inject(function ($injector) {
			var tmpl = '<dl accordion mode="solo" class="accordion">'+
							'<dt>A title 1</dt>'+
								'<dd>A description 1</dd>'+
							'<dt>A title 2</dt>'+
								'<dd>A description 2</dd>'+
							'<dt>A title 3</dt>'+
								'<dd>A description 3</dd>'+
						'</dl>';

			el = angular.element(tmpl);
			
			// get $compile and $rootScope
			$compile   = $injector.get('$compile');
			$rootScope = $injector.get('$rootScope');

			// create a new scope
			$scope = $rootScope.$new();

			// compile the created element with the create scope
			$compile(el)($scope);

			// Run all the watches on the current scope
			$scope.$digest();
		}));

		beforeEach(function() {
			dt = el.find('dt');
			dd = el.find('dd');

			clickEvent = new MouseEvent('click', {
				'view': window,
				'bubbles': true,
				'cancelable': false
			});
		});

// it('should initially set all except first item to be in "closed" state.', function() {
// it('should only allow one item to be open at a time.', function() {

		it('should initially set all except first item to be in "closed" state.', function() {
			// first item
			expect(angular.element(dt[0]).hasClass('open')).toBe(true);
			expect(angular.element(dt[0]).hasClass('closed')).toBe(false);
			expect(angular.element(dd[0]).hasClass('hidden')).toBe(false);

			// other items
			expect(angular.element(dt[1]).hasClass('closed')).toBe(true);
			expect(angular.element(dd[1]).hasClass('hidden')).toBe(true);
			expect(angular.element(dt[2]).hasClass('closed')).toBe(true);
			expect(angular.element(dd[2]).hasClass('hidden')).toBe(true);
		});

		it('should only allow one item to be open at a time.', function() {
			// click on the third title
			dt[2].dispatchEvent(clickEvent);

			// first item should close
			expect(angular.element(dt[0]).hasClass('closed')).toBe(true);
			expect(angular.element(dd[0]).hasClass('hidden')).toBe(true);

			// second item should close
			expect(angular.element(dt[1]).hasClass('closed')).toBe(true);
			expect(angular.element(dd[1]).hasClass('hidden')).toBe(true);

			// third item should open
			expect(angular.element(dt[2]).hasClass('open')).toBe(true);
			expect(angular.element(dt[2]).hasClass('closed')).toBe(false);
			expect(angular.element(dd[2]).hasClass('hidden')).toBe(false);
			


			// click on the third title
			dt[1].dispatchEvent(clickEvent);

			// first item should close
			expect(angular.element(dt[0]).hasClass('closed')).toBe(true);
			expect(angular.element(dd[0]).hasClass('hidden')).toBe(true);

			// third item should close
			expect(angular.element(dt[2]).hasClass('closed')).toBe(true);
			expect(angular.element(dd[2]).hasClass('hidden')).toBe(true);

			// second item should open
			expect(angular.element(dt[1]).hasClass('open')).toBe(true);
			expect(angular.element(dt[1]).hasClass('closed')).toBe(false);
			expect(angular.element(dd[1]).hasClass('hidden')).toBe(false);
		});

	});
})();
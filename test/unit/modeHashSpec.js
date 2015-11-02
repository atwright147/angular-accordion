(function() {
	'use strict';

	describe('Accordion with mode set to "hash"', function () {
		var el, $compile, $rootScope, $scope, $location;
		var dt, dd, clickEvent;

		beforeEach(module('app'));

		beforeEach(inject(function ($injector) {
			var tmpl = '<dl accordion mode="hash" class="accordion">'+
							'<dt>A title 1</dt>'+
								'<dd>A description 1</dd>'+
							'<dt>A title 2</dt>'+
								'<dd>A description 2</dd>'+
							'<dt class="hashdemo">A title 3*</dt>'+
								'<dd>A description 3</dd>'+
						'</dl>';

			el = angular.element(tmpl);
			
			// get $compile and $rootScope
			$compile   = $injector.get('$compile');
			$rootScope = $injector.get('$rootScope');
			$location  = $injector.get('$location');

			// create a new scope
			$scope = $rootScope.$new();

			// compile the created element with the create scope
			$compile(el)($scope);

			// Run all the watches on the current scope
			$location.hash('hashdemo');
			$scope.$apply();
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

// it('should initially set <dt> with class equal to hash & sibling <dl> class to be in open state.', function() {
// it('should initially set <dt>s & <dl>s without class matching the url hash to be in closed state.', function() {	
// it('should change css classes of target <dt> and child <dd> to inverse of current when target <dt> is clicked.', function() {


		it('should initially set all except item with class that matches "hashdemo" to be in "closed" state.', function() {
			// item with class matching hash
			expect(angular.element(dt[2]).hasClass('open')).toBe(true);
			expect(angular.element(dt[2]).hasClass('closed')).toBe(false);
			expect(angular.element(dd[2]).hasClass('hidden')).toBe(false);

			// other items
			expect(angular.element(dt[0]).hasClass('closed')).toBe(true);
			expect(angular.element(dd[0]).hasClass('hidden')).toBe(true);
			expect(angular.element(dt[1]).hasClass('closed')).toBe(true);
			expect(angular.element(dd[1]).hasClass('hidden')).toBe(true);
		});

	});
})();
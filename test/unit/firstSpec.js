(function() {
	'use strict';

	describe('Accordion with mode "first"', function () {
		var el, $compile, $rootScope, $scope;

		beforeEach(module('app'));

		beforeEach(inject(function ($injector) {
			var tmpl = '<dl accordion mode="first" class="accordion">'+
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

// it('should initially set first <dt> & <dl> class to be in open state.', function() {		
// it('should initially set second++ <dt>s & <dl>s class to be in closed state.', function() {		
// it('should change css classes of target <dt> and child <dd> to inverse of current when target <dt> is clicked.', function() {


		it('should initialise with first item open and others closed', function () {
			var dt = el.find('dt');
			var dd = el.find('dd');

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

	});
})();
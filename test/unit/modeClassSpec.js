(function() {
	'use strict';

	describe('Accordion with mode set to "class"', function () {
		var el, $compile, $rootScope, $scope;
		var dt, dd, clickEvent;

		beforeEach(module('app'));

		beforeEach(inject(function ($injector) {
			var tmpl = '<dl accordion mode="class" class="accordion">'+
							'<dt>A title 1</dt>'+
								'<dd>A description 1</dd>'+
							'<dt class="open">A title 2</dt>'+
								'<dd>A description 2</dd>'+
							'<dt>A title 3*</dt>'+
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


		it('should initially set all with class "open" to be in "open" state and others to be "closed".', function() {
			// item with class "open"
			expect(angular.element(dt[1]).hasClass('closed')).toBe(false);
			expect(angular.element(dd[1]).hasClass('hidden')).toBe(false);

			// other items
			expect(angular.element(dt[0]).hasClass('closed')).toBe(true);
			expect(angular.element(dd[0]).hasClass('hidden')).toBe(true);
			expect(angular.element(dt[2]).hasClass('closed')).toBe(true);
			expect(angular.element(dd[2]).hasClass('hidden')).toBe(true);
		});

		it('* should invert state of each item when clicked.', function() {
			angular.forEach(dt, function(item, index) {
				item = angular.element(dt[index]);
				var initialClass = item.attr('class');

				item[0].dispatchEvent(clickEvent);

				if (initialClass.indexOf('open') > -1) {
					expect(item.hasClass('closed')).toBe(true);
					expect(angular.element(dd[index]).hasClass('hidden')).toBe(true);
				} else {
					expect(item.hasClass('open')).toBe(true);
					expect(angular.element(dd[index]).hasClass('hidden')).toBe(false);
				}
			});
		});

	});
})();
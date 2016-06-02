(function() {
	'use strict';

	describe('Accessible accordion', function () {
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


		it('should have appropriate role attribute.', function() {
			var attrRole = el.attr('role');
			var attrAriaMultiSelectable = el.attr('aria-multiselectable');
			expect(attrRole).toEqual('tablist');
			expect(attrAriaMultiSelectable).toEqual('true');
		});

		it('should have titles and descriptions with correct attributes.', function() {
			angular.forEach(dt, function(item, index) {
				var title = angular.element(dt[index]);
				var desc  = angular.element(title.next());
				
				expect(title.attr('role')).toEqual('tab');
				expect(title.attr('tabindex')).toEqual('0');
				expect(desc.attr('role')).toEqual('tabpanel');
				
				if (title.hasClass('closed')) {
					expect(title.attr('aria-expanded')).toEqual('false');
					expect(desc.attr('aria-hidden')).toEqual('true');
				}
				else {
					expect(title.attr('aria-expanded')).toEqual('true');
					expect(desc.attr('aria-hidden')).toEqual('false');
				}
			});
		});

		xit('should have correct attributes before and after clicking.', function() {
			var title = angular.element(dt[0]);
			var desc  = angular.element(title.next());
			
			//item[0].dispatchEvent(clickEvent);
			if (title.hasClass('closed')) {
				expect(title.attr('aria-expanded')).toEqual('false');
				expect(desc.attr('aria-hidden')).toEqual('true');
				console.log(title.attr('aria-expanded'));
				title[0].dispatchEvent(clickEvent);
				console.log( angular.element(title[0]).attr('aria-expanded') );
				expect(title.attr('aria-expanded')).toEqual('true');
				expect(desc.attr('aria-hidden')).toEqual('false');
			}
			else {
				//expect(title.attr('aria-expanded')).toEqual('true');
				//expect(desc.attr('aria-hidden')).toEqual('false');
			}
		});

	});
})();
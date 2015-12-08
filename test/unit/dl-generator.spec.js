(function() {
	'use strict';

	describe('Accordion generator', function () {
		var el, $compile, $rootScope, $scope;
		var dl, dt, dd;

		beforeEach(module('app'));

		beforeEach(inject(function ($injector) {
			var tmpl = '<definition-list content="myContent" accordion class="accordion"></definition-list>';

			el = angular.element(tmpl);
			
			// get $compile and $rootScope
			$compile   = $injector.get('$compile');
			$rootScope = $injector.get('$rootScope');

			// set up some content for the directive (sort of stub a controller scope)
			$rootScope.myContent = [
				{title: 'Title 01', desc: 'Description 01', attributes: {'class': 'open', 'id': 'first'}},
				{title: 'Title 02', desc: 'Description 02'},
				{title: 'Title 03', desc: 'Description 03'}
			];

			// create a new scope
			$scope = $rootScope.$new();

			// compile the created element with the create scope
			$compile(el)($scope);

			// Run all the watches on the current scope
			$scope.$digest();
		}));

		beforeEach(function() {
			dl = el.find('dl');
			dt = el.find('dt');
			dd = el.find('dd');
		});


		it('should create a definition list element.', function() {
			expect(angular.element(dl[0])).toBeDefined(true);
		});

		it('should create <dt> elements with correct content.', function() {
			expect(dt[0].innerHTML).toContain('Title 01');
			expect(dt[1].innerHTML).toContain('Title 02');
			expect(dt[2].innerHTML).toContain('Title 03');
		});

		it('should create <dd> elements with correct content.', function() {
			expect(dd[0].innerHTML).toContain('Description 01');
			expect(dd[1].innerHTML).toContain('Description 02');
			expect(dd[2].innerHTML).toContain('Description 03');
		});

		it('should create a first dt element with attributes.', function() {
			var _dt = angular.element(dt[0]);
			expect(_dt.hasClass('open')).toBe(true);
			expect(_dt.attr('id') === 'first').toBe(true);
		});

	});
})();
/**
* Accordion Module
*
* Description
*/
angular.module('accordion', []);

angular.module('accordion').directive('accordion', function() {
	// Runs during compile
	return {
		// name: '',
		// priority: 1,
		// terminal: true,
		// scope: {}, // {} = isolate, true = child, false/undefined = no change
		// controller: function($scope, $element, $attrs, $transclude) {},
		// require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
		restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
		// template: '',
		// templateUrl: '',
		// replace: true,
		// transclude: true,
		// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
		link: function($scope, elem, attrs) {

			var classOpen   = 'open',
				classClosed = 'closed';

			var allDt = elem.find('dt');
			var allDd = elem.find('dd');

			angular.forEach(allDd, function(item, index) {

				var _desc  = angular.element(item),
					_title = angular.element(_desc[0].previousElementSibling);

				switch(attrs.mode) {
					case 'hash':
						urlHash = location.hash.replace('#', '');
						if (urlHash && _title.hasClass(urlHash)) {
							_title.removeClass(classClosed).addClass(classOpen);
						} else {
							_title.addClass(classClosed).removeClass(classOpen);
		 					_desc.addClass('hidden');
						}
						break;

					case 'first':
						if (!index) {
							_desc.removeClass('hidden');
							_title.removeClass(classClosed).addClass(classOpen);
						} else {
							_desc.addClass('hidden');
							_title.removeClass(classOpen).addClass(classClosed);
						}
						break;

					case 'class':
					default:
						if (!_title.hasClass(classOpen)) {
		 					_desc.addClass('hidden');
							_title.addClass(classClosed);
						}
						break;
				}

			});

			allDt.on('click', function(e) {
				var _title = angular.element(this);
				_title.toggleClass(classOpen+' '+classClosed);
				_title.next().toggleClass('hidden');
				e.preventDefault();
			});
		}
	};
});
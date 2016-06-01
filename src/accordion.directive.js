angular.module('accordion').directive('accordion', function($location, $rootScope) {
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

			elem.attr('role', 'tablist');
			elem.attr('aria-multiselectable', 'true');

			angular.forEach(allDd, function(item, index) {

				var _desc  = angular.element(item),
					_title = angular.element(_desc[0].previousElementSibling);
					_title.prop('data-index', index);

				_title.attr({'role': 'tab', 'tabindex': 0});
				_desc.attr('role', 'tabpanel');

				switch(attrs.mode) {
					case 'hash':
						$rootScope.$on('$locationChangeSuccess', function() {
							var urlHash = $location.hash().replace('#', '');
							if (urlHash && _title.hasClass(urlHash)) {
								_title.removeClass(classClosed).addClass(classOpen);
								_title.attr('aria-expanded', true);
								
								_desc.removeClass('hidden');
								_desc.attr('aria-hidden', false);
							} else {
								_title.addClass(classClosed).removeClass(classOpen);
								_title.attr('aria-expanded', false);
								
								_desc.addClass('hidden');
								_desc.attr('aria-hidden', true);
							}
						});
						break;

					case 'solo':
					case 'first':
						if (!index) {
							_title.removeClass(classClosed).addClass(classOpen);
							_title.attr('aria-expanded', true);
							
							_desc.removeClass('hidden');
							_desc.attr('aria-hidden', false);
						} else {
							_title.removeClass(classOpen).addClass(classClosed);
							_title.attr('aria-expanded', false);
							
							_desc.addClass('hidden');
							_desc.attr('aria-hidden', true);
						}
						break;

					case 'class':
					default:
						if (!_title.hasClass(classOpen)) {
							_title.addClass(classClosed);
							_title.attr('aria-expanded', false);
							
							_desc.addClass('hidden');
							_desc.attr('aria-hidden', true);
						} else {
							_title.attr('aria-expanded', true);
							_desc.attr('aria-hidden', false);
						}
						break;
				}

			});

			allDt.on('click', function(e) {
				var _title = angular.element(this);
				if (attrs.mode === 'solo') {
					allDt.addClass('closed').removeClass('open');
					allDt.attr({'aria-expanded': false, 'aria-selected': false});
					allDd.addClass('hidden');
				}

				if (_title.hasClass(classOpen)) {
					// accordion tab is open
					_title.removeClass(classOpen).addClass(classClosed);
					_title.next().attr({'aria-expanded': false, 'aria-selected': false});
				} else {
					// accordion tab is closed
					_title.removeClass(classClosed).addClass(classOpen);
					_title.next().attr({'aria-expanded': true, 'aria-selected': true});
				}
				//_title.toggleClass(classOpen+' '+classClosed);
				_title.next().toggleClass('hidden');
				e.preventDefault();

			}).on('keyup', function(e) {
				var _title = angular.element(this);
				var _desc  = _title.next();

				if (attrs.mode === 'solo' && (e.which === 13 || e.which === 32 || e.which === 37 || e.which === 39)) {
					allDt.addClass('closed').removeClass('open');
					allDt.attr({'aria-expanded': false, 'aria-selected': false});
					allDd.addClass('hidden');
				}

				// 32 = space
				// 13 = enter

				// 38 = up
				// 40 = down
				// 37 = left
				// 39 = right
				switch (e.which) {
					case 13:
					case 32:
						if (_desc.hasClass('hidden')) {
							_title.removeClass(classClosed).addClass(classOpen);
							_desc.attr('aria-hidden', false);
							_desc.removeClass('hidden');
						} else {
							_title.removeClass(classOpen).addClass(classClosed);
							_desc.attr('aria-hidden', true);
							_desc.addClass('hidden');
						}
						break;

					case 38:
						var prevItem = allDt[_title.prop('data-index')-1];
						if (prevItem) {
							prevItem.focus();
						}
						e.preventDefault();
						break;

					case 40:
						var nextItem = allDt[_title.prop('data-index')+1];
						if (nextItem) {
							nextItem.focus();
						}
						e.preventDefault();
						break;

					case 37:
						if ( ! _desc.hasClass('hidden')) {
							_title.removeClass(classOpen).addClass(classClosed);
							_desc.attr('aria-hidden', true);
							_desc.addClass('hidden');
						}
						e.preventDefault();
						break;

					case 39:
						if (_desc.hasClass('hidden')) {
							_title.removeClass(classClosed).addClass(classOpen);
							_desc.attr('aria-hidden', false);
							_desc.removeClass('hidden');
						}
						e.preventDefault();
						break;

				}

				e.preventDefault();

			});
		}
	};
});
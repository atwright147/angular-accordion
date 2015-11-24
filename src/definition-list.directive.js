angular.module('accordion').controller('FaqController', function($scope){
	$scope.myContent = [
		{title: 'Title 01', desc: 'Description 01', attributes: {'class': 'open', 'id': 'first'}},
		{title: 'Title 02', desc: 'Description 02'},
		{title: 'Title 03', desc: 'Description 03'}
	];
});

angular.module('accordion').directive('definitionList', function(){
	// Runs during compile
	return {
		// name: '',
		// priority: 1,
		// terminal: true,
		scope: {
			content: '=content'
		}, // {} = isolate, true = child, false/undefined = no change
		// controller: function($scope, $element, $attrs, $transclude) {},
		// require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
		restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
		// template: '',
		// templateUrl: '',
		// replace: true,
		// transclude: true,
		// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
		link: function(scope, elem, attrs, ngModel) {
			var list = angular.element('<dl>');
			var title, desc;
			angular.forEach(scope.content, function(item, key) {
				// create a definition title element, then add content and attributes
				title = angular.element('<dt>');
				title.html(item.title);
				if (item.attributes) {
					angular.forEach(item.attributes, function(attr, key) {
						title.attr(key, attr);
					});
				}

				// create a definition description element, then add content
				desc = angular.element('<dd>');
				desc.html(item.desc);

				// append the elements into the definition list
				list.append(title);
				list.append(desc);
			});
			
			// append the definition list into the page
			elem.append(list);
		}
	};
});
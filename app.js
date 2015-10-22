/**
* App Module
*
* Description
*/
angular.module('app', ['accordion']);

angular.module('app').config(function($locationProvider) {
	$locationProvider.html5Mode({
		enabled: true,
		requireBase: false
	});
});
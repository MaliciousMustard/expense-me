var expenseMeApp = angular.module('expenseMeApp', ['ngRoute']);

// configuration and routing
expenseMeApp.config(['$routeProvider', function($routeProvider) {
	$routeProvider.
		when("/newItem", {
			templateUrl: 'partials/newItem.html',
			controller: 'NewItemCtrl'
		}).
		otherwise({"redirectTo": "/newItem"});
}]);


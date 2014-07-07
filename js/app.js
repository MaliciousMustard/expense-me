var expenseMeApp = angular.module('expenseMeApp', ['ngRoute']);

expenseMeApp.controller("NewItemCtrl", function($scope) {
	$scope.existingItems = localStorage.getItem("items");
	if (!$scope.existingItems) {
		$scope.existingItems = {};
	}
});

// configuration and routing
expenseMeApp.config(['$routeProvider', function($routeProvider) {
	$routeProvider.
		when("/newItem", {
			templateUrl: 'partials/newItem.html',
			controller: 'NewItemCtrl'
		}).
		otherwise({"redirectTo": "/newItem"});
}]);


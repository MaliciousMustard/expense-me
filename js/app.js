var expenseMeApp = angular.module('expenseMeApp', ['ngRoute']);

// configuration and routing
expenseMeApp.config(['$routeProvider', function($routeProvider) {
	$routeProvider.
		when("/editItems", {
			templateUrl: 'partials/editItems.html',
			controller: 'EditItemsCtrl'
		}).
		when("/editItem/:itemName", {
			templateUrl: 'partials/newItem.html',
			controller: 'NewItemCtrl'
		}).
		when("/newItem", {
			templateUrl: 'partials/newItem.html',
			controller: 'NewItemCtrl'
		}).
		when("/items", {
			templateUrl: 'partials/items.html',
			controller: 'ItemsCtrl'
		}).
		otherwise({"redirectTo": "/items"});
}]);


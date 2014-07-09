var expenseMeApp = angular.module('expenseMeApp', ['ngRoute']);

// configuration and routing
expenseMeApp.config(['$routeProvider', function($routeProvider) {
	$routeProvider.
		when("/expenses", {
			templateUrl: 'partials/expenses.html',
			controller: 'ExpensesCtrl'
		}).
		when("/itemList", {
			templateUrl: 'partials/itemList.html',
			controller: 'ItemListCtrl'
		}).
		when("/editItem/:itemName", {
			templateUrl: 'partials/itemDetails.html',
			controller: 'ItemDetailsCtrl'
		}).
		when("/newItem", {
			templateUrl: 'partials/itemDetails.html',
			controller: 'ItemDetailsCtrl'
		}).
		when("/home", {
			templateUrl: 'partials/home.html',
			controller: 'HomeCtrl'
		}).
		otherwise({"redirectTo": "/home"});
}]);


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
			controller: 'ItemDetailsCtrl',
			resolve: {
				status: function() {
					return {
						newItem: false,
						updateItem: true,
						newItemOnTheFly: false
					};
				}
			}
		}).
		when("/newItem", {
			templateUrl: 'partials/itemDetails.html',
			controller: 'ItemDetailsCtrl',
			resolve: {
				status: function() {
					return {
						newItem: true,
						updateItem: false,
						newItemOnTheFly: false
					};
				}
			}
		}).
		when("/newItemOnTheFly", {
			templateUrl: 'partials/itemDetails.html',
			controller: 'ItemDetailsCtrl',
			resolve: {
				status: function() {
					return {
						newItem: false,
						updateItem: false,
						newItemOnTheFly: true
					};
				}
			}
		}).
		when("/home", {
			templateUrl: 'partials/home.html',
			controller: 'HomeCtrl'
		}).
		otherwise({"redirectTo": "/home"});
}]);

var FLOAT_REGEXP = /^\-?\d+((\.|\,)\d+)?$/;
expenseMeApp.directive('float', function() {
  return {
    require: 'ngModel',
    link: function(scope, elm, attrs, ctrl) {
      ctrl.$parsers.unshift(function(viewValue) {
        if (!viewValue || FLOAT_REGEXP.test(viewValue)) {
          ctrl.$setValidity('float', true);
          return parseFloat(viewValue.replace(',', '.'));
        } else {
          ctrl.$setValidity('float', false);
          return undefined;
        }
      });
    }
  };
});

expenseMeApp.service('notificationService', function() {
	return {
		notifyRegistered: function(itemName) {
			alertBox.show(itemName + ' registered');
		}
	};
});

// The following code is taken from bootboxjs.com
var alertBox = (function() {
	"use strict";

	var elem, hideHandler, that = {};

	that.init = function(options) {
		elem = $(options.selector);
	};

	that.show = function(text) {
		clearTimeout(hideHandler);

		elem.find("span").html(text);
		elem.delay(200).fadeIn().delay(2500).fadeOut();
	};

	return that;
}());
// end of bootboxjs.com snippet

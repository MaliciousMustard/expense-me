var expenseMeApp = angular.module('expenseMeApp', ['ngRoute']);

// configuration and routing
expenseMeApp.config(['$routeProvider', function($routeProvider) {
	$routeProvider.
		when("/about", {
			templateUrl: 'partials/about.html'
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
		when("/expenses", {
			templateUrl: 'partials/expenses.html',
			controller: 'ExpensesCtrl'
		}).
		when("/home", {
			templateUrl: 'partials/home.html',
			controller: 'HomeCtrl'
		}).
		when("/itemList", {
			templateUrl: 'partials/itemList.html',
			controller: 'ItemListCtrl'
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
		when("/settings", {
			templateUrl: 'partials/settings.html',
			controller: 'SettingsCtrl'
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

expenseMeApp.directive('datetimez', function() {
    return {
        restrict: 'A',
        require : 'ngModel',
        link: function(scope, element, attrs, ngModelCtrl) {
			element.datetimepicker({
				autoclose: true,
				format: "MM-yyyy",
				viewMode: "months", 
				minViewMode: "months",
				pickTime: false
			}).on('changeDate', function(e) {
				scope.showDate = {
					month: e.date.getMonth(),
					year: e.date.getFullYear()
				}
				scope.$apply();
			});
        }
    };
});

expenseMeApp.service('notificationService', function() {
	return {
		notifyRegistered: function(itemName) {
			alertBox.show(itemName + ' registered');
		},
		notifyAdded: function(itemName) {
			alertBox.show(itemName + ' added');
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
		elem.delay(200).fadeIn().delay(1000).fadeOut();
	};

	return that;
}());
// end of bootboxjs.com snippet

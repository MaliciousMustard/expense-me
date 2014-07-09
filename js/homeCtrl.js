expenseMeApp.controller('HomeCtrl', function($scope) {
	var itemsStr = localStorage[itemsKey];
	if (itemsStr) {
		$scope.items = JSON.parse(itemsStr);
	} else {
		$scope.items = [];
	}
	$scope.iconPerCategory = [];
	for (i in categories) {
		$scope.iconPerCategory[categories[i].name] = categories[i].icon;
	}
	
	$scope.registerExpense = function(item) {
		if (item.price) {
			alertBox.show(item.name + ' registered');
		} else {
			bootbox.prompt("Price for " + item.name, function(price) {
				if (price && !isNaN(price)) {
					alertBox.show(item.name + ' registered');
				} else {
					return false;
				}
			});
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
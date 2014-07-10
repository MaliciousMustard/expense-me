expenseMeApp.controller('HomeCtrl', function($scope, $location, notificationService) {
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
			storeInDb(item, new Date());
			notificationService.notifyRegistered(item.name);
		} else {
			bootbox.prompt("Price for " + item.name, function(price) {
				if (price && !isNaN(price)) {
					var newItem = jQuery.extend({}, item);
					newItem.price = price;
					storeInDb(newItem, new Date());
					notificationService.notifyRegistered(newItem.name);
				} else {
					return false;
				}
			});
		}
	};
	
	$scope.newExpense = function() {
		$location.path('/newItemOnTheFly');
	};
});

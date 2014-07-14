expenseMeApp.controller('HomeCtrl', function($scope, $location, notificationService) {
	$scope.beenHereBefore = localStorage[beenHereBefore];
	localStorage[beenHereBefore] = "true";
	
	$scope.lang = lang;
	
	var itemsStr = localStorage[itemsKey];
	$scope.items = [];
	if (itemsStr) {
		var allItems = JSON.parse(itemsStr);
		if (allItems.length > 0) {
			allItems.push(undefined); // dummy element for the additional button that is not part of the items
			for (var i = 0; i < allItems.length; i++) {
				if (i % 3 == 0) {
					$scope.items.push([]);
				}
				$scope.items[$scope.items.length - 1].push(allItems[i]);
			}
		}
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

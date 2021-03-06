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
		$scope.iconPerCategory[categories[i].value] = categories[i].icon;
	}
	
	$scope.select = function(item) {
		$scope.selectedItem = jQuery.extend({}, item);
	};
	
	$scope.registerExpense = function(item) {
		storeInDb(item, new Date());
		notificationService.notifyRegistered(item.name);
	};
	
	$scope.newExpense = function() {
		$location.path('/newItemOnTheFly');
	};
});

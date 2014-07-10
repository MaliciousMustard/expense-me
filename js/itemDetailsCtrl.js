expenseMeApp.controller("ItemDetailsCtrl", function($scope, $location, $routeParams, status, notificationService) {
	
	$scope.categories = categories; // categories are coming from constants.js
	
	var items = localStorage[itemsKey];
	if (items) {
		$scope.existingItems = JSON.parse(items);
	} else {
		$scope.existingItems = [];
	}
	
	var itemParam = $routeParams.itemName;
	if (itemParam) {
		for (i in $scope.existingItems) {
			if ($scope.existingItems[i].name === itemParam) {
				$scope.item = $scope.existingItems[i];
				break;
			}
		}
	} 
	if (!$scope.item) {
		$scope.item = {};
	}
	
	$scope.status = status;
	console.log($scope.status);
	$scope.noCategory = noCategory;
	
	$scope.$watch('item.name', function(newVal) {
		if (!$scope.status.updateItem && $scope.item.name && $scope.existingItems.filter(function(item) { return item.name === $scope.item.name; }).length > 0) {
			$scope.itemForm.name.$setValidity('duplicate', false);
		} else {
			$scope.itemForm.name.$setValidity('duplicate', true);
		}
	});
	
	$scope.hasEightItems = function() {
		return $scope.existingItems.length >= 8;
	};
	
	$scope.canBeSaved = function() {
		return $scope.item.name && !$scope.itemForm.name.$invalid && !$scope.itemForm.name.$error.duplicate && !$scope.itemForm.price.$invalid;
	};
	
	var updateItems = function(item, items, position) {
		if (item.category === $scope.noCategory) {
			delete item.category;
		}
		if (position) {
			items[position] = item;
		} else {
			var randomIndex = Math.floor(Math.random() * (colors.length));
			item.color = colors[randomIndex];
			items.push(item);
		}
		localStorage[itemsKey] = JSON.stringify(items);
	};
	
	$scope.registerItem = function() {
		if ($scope.item.category === $scope.noCategory) {
			delete $scope.item.category;
		}
		storeInDb($scope.item, new Date());
		$scope.back('/home');
		notificationService.notifyRegistered($scope.item.name);
	};
	
	$scope.save = function() {
		updateItems($scope.item, $scope.existingItems);
		$location.path("/home");
	};
	
	$scope.saveAndClear = function() {
		updateItems($scope.item, $scope.existingItems);
		$scope.itemForm.$setPristine();
		$scope.item = {};
	};
	
	$scope.back = function(location) {
		$location.path(location);
	};
	
	$scope.updateItem = function() {
		for (i in $scope.existingItems) {
			if ($scope.existingItems[i].name == $scope.item.name) {
				updateItems($scope.item, $scope.existingItems, i);
				
				$location.path("/itemList");
				break;
			}
		}
	};
	
	$scope.deleteItem = function() {
		for (i in $scope.existingItems) {
			if ($scope.existingItems[i].name === $scope.item.name) {
				$scope.existingItems.splice(i, 1);
				localStorage[itemsKey] = JSON.stringify($scope.existingItems);
				$location.path("/itemList");
				break;
			}
		}
	}

});

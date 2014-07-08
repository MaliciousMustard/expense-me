expenseMeApp.controller("NewItemCtrl", function($scope, $location) {
	$scope.categories = categories; // categories are coming from constants.js
	
	$scope.newItem = {};
	
	var items = localStorage[itemsKey];
	if (items) {
		$scope.existingItems = JSON.parse(items);
	} else {
		$scope.existingItems = [];
	}
	
	$scope.$watch('newItem.name', function(newVal) {
		if ($scope.newItem.name && $scope.existingItems.indexOf($scope.newItem.name) > -1) {
			$scope.newItemForm.name.$error.duplicate = true;
		} else {
			$scope.newItemForm.name.$error.duplicate = false;
		}
	});
	
	$scope.$watch('newItem.price', function(newVal) {
		if (newVal) {
			$scope.newItemForm.price.$invalid = isNaN(newVal);
		} else {
			$scope.newItemForm.price.$invalid = false;
		}
	});
	
	$scope.canBeSaved = function() {
		return $scope.newItem.name && !$scope.newItemForm.name.$invalid && !$scope.newItemForm.name.$error.duplicate && !$scope.newItemForm.price.$invalid;
	};
	
	var updateItems = function(item, items) {
		items.push(item);
		localStorage[itemsKey] = JSON.stringify(items);
	}
	
	$scope.save = function() {
		updateItems($scope.newItem, $scope.existingItems);
		$location.path("/items");
	};
	
	$scope.saveAndClear = function() {
		updateItems($scope.newItem, $scope.existingItems);
		$scope.newItemForm.$setPristine();
		$scope.newItem = {};
	};
	
	$scope.cancel = function() {
		$location.path("/items");
	}
});

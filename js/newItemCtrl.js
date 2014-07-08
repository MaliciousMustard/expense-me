expenseMeApp.controller("NewItemCtrl", function($scope, $location) {
	var items = localStorage["items"];
	if (items) {
		$scope.existingItems = JSON.parse(items);
	} else {
		$scope.existingItems = [];
	}
	
	$scope.$watch('itemName', function(newVal) {
		if ($scope.itemName && $scope.existingItems.indexOf($scope.itemName) > -1) {
			$scope.newItemForm.name.$error.duplicate = true;
		} else {
			$scope.newItemForm.name.$error.duplicate = false;
		}
	});
	
	$scope.$watch('itemPrice', function(newVal) {
		if (newVal) {
			$scope.newItemForm.price.$invalid = isNaN(newVal);
		} else {
			$scope.newItemForm.price.$invalid = false;
		}
	});
	
	$scope.canBeSaved = function() {
		return $scope.itemName && !$scope.newItemForm.name.$invalid && !$scope.newItemForm.name.$error.duplicate && !$scope.newItemForm.price.$invalid;
	};
	
	var updateItems = function(item, items) {
		items.push(item);
		localStorage["items"] = JSON.stringify(items);
		console.log(localStorage["items"]);
	}
	
	$scope.save = function() {
		updateItems($scope.itemName, $scope.existingItems);
		$location.path("/items");
	};
	
	$scope.saveAndClear = function() {
		updateItems($scope.itemName, $scope.existingItems);
		$scope.newItemForm.$setPristine();
		$scope.itemName = "";
		$scope.itemDesc = "";
		$scope.itemPrice = "";
	};
});

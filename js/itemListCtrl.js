expenseMeApp.controller('ItemListCtrl', function($scope) {
	var items = localStorage[itemsKey];
	if (items) {
		$scope.existingItems = JSON.parse(items);
	} else {
		$scope.existingItems = [];
	}
	$scope.lang = lang;
});
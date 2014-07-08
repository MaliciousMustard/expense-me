expenseMeApp.controller('ItemsCtrl', function($scope) {
	var itemsStr = localStorage["items"];
	if (itemsStr) {
		$scope.items = JSON.parse(itemsStr);
	} else {
		$scope.items = [];
	}
});
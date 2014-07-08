expenseMeApp.controller('ItemsCtrl', function($scope) {
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
});
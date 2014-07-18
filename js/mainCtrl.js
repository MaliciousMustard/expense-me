expenseMeApp.controller('MainCtrl', function($scope) {
	$scope.lang = lang;
	
	$scope.updateLang = function() {
		$scope.lang = lang;
	};
});
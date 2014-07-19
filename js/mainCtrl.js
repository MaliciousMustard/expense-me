expenseMeApp.controller('MainCtrl', function($scope) {
	$scope.lang = lang;
	
	$scope.selectedFaq = null;
	
	$scope.updateLang = function() {
		$scope.lang = lang;
	};
});
expenseMeApp.controller('HelpCtrl', function($scope) {

	$scope.lang = lang;
	
	var showElement = function(elementId) {
		$(elementId).collapse('show');
		$(elementId).parent().find('i').toggleClass('glyphicon-chevron-right glyphicon-chevron-down');
	};
	
	var hideElement = function(elementId) {
		$(elementId).collapse('hide');
		$(elementId).parent().find('i').toggleClass('glyphicon-chevron-down glyphicon-chevron-right');
	};
	
	if ($scope.$parent.selectedFaq) {
		showElement($scope.$parent.selectedFaq);
	}
	
	$scope.selectFaq = function(q) {
		if ($scope.$parent.selectedFaq) {
			hideElement($scope.$parent.selectedFaq);
		}
		if (q != $scope.$parent.selectedFaq) {
			showElement(q);
			$scope.$parent.selectedFaq = q;
		} else {
			$scope.$parent.selectedFaq = undefined;
		}
	};

});
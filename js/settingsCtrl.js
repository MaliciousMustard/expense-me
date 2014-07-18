expenseMeApp.controller('SettingsCtrl', function($scope) {
	$scope.lang = lang;
	
	var initializeCtrl = function() {
		$scope.languages = languages();
		
		$scope.languageSetting = localStorage[langKey];
		if (!$scope.languageSetting) {
			$scope.languageSetting = $scope.languages[0].value; // device language
		}
		for (var i in $scope.languages) {
			if ($scope.languages[i].value === $scope.languageSetting) {
				$scope.selectedLanguage = $scope.languages[i].value;
				break;
			}
		}
	}
	
	$scope.changeLanguage = function() {
		if ($scope.selectedLanguage === $scope.languageSetting) { // no change
			return;
		} else if ($scope.selectedLanguage === $scope.languages[0].value) { // device language selected
			delete localStorage[langKey];
		} else {
			localStorage[langKey] = $scope.selectedLanguage;
		}
		findLanguage(); // update app's language
		$scope.lang = lang;
		if ($scope.$parent) {
			$scope.$parent.updateLang();
		}
		initializeCtrl();
	};
	
	initializeCtrl();
});
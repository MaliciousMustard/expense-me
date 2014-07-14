expenseMeApp.controller('ExpenseDetailsCtrl', function($scope, $routeParams, $location, notificationService) {
	$scope.lang = lang;
	$scope.categories = categories; // categories are coming from constants.js
	$scope.expense = JSON.parse($routeParams.expense);
	$scope.noCategory = noCategory;
	
	$scope.canBeSaved = function() {
		return !$scope.expenseForm.price.$invalid;
	};
	
	$scope.deleteExpense = function() {
		removeExpenseFromDb($scope.expense.timestamp);
		$location.path('/expenses');
		notificationService.notifyDeleted($scope.expense.name);
	};
	
	$scope.updateExpense = function() {
		updateExpenseInDb($scope.expense);
		$location.path('/expenses');
		notificationService.notifyUpdated($scope.expense.name);
	};
});

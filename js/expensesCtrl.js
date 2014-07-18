expenseMeApp.controller('ExpensesCtrl', function($scope, $location) {
	$scope.lang = lang;
	$scope.months = months();
	$scope.iconPerCategory = [];
	for (i in categories) {
		$scope.iconPerCategory[categories[i].value] = categories[i].icon;
	}
	
	$scope.$watch('showDate', function(newDate) {
		$scope.showDateStr = '' + (newDate.month + 1) + '-' + newDate.year;
		getExpensesSummaryFromDb(newDate.year, newDate.month, updatePieChartWithResults);
		getExpensesFromDb(newDate.year, newDate.month, updateScopeWithResults);
	});

	$scope.days = [];
	$scope.expenses = [];
	var updateScopeWithResults = function(items) {
		var len = items.length;
		$scope.days = [];
		$scope.expenses = [];
		var currentDay = 0;
		var currentDayStr = undefined;
		for (i = 0; i < len; i++){
			var currentItem = items[i];
			if (currentItem.day != currentDay) {
				currentDayStr = months()[currentItem.month] + ' ' + currentItem.day + ', ' + currentItem.year;
				$scope.days.push(currentDayStr);
				$scope.expenses[currentDayStr] = [];
				currentDay = currentItem.day;
			}
			$scope.expenses[currentDayStr].push(currentItem);
		}

		$scope.$apply();
	};
	
	function labelFormatter(label, series) {
		return "<div style='font-size:8pt; text-align:center; padding:2px; color:white;'>" + label + "<br/>" + Math.round(series.percent) + "%</div>";
	}
	
	var updatePieChartWithResults = function(data) {
		// Build the chart
		$('#container').highcharts({
			credits: {
				enabled: false
			},
			chart: {
				plotBackgroundColor: null,
				plotBorderWidth: null,
				plotShadow: false
			},
			tooltip: {
				pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
			},
			title: { text: ""},
			exporting: { enabled: false },
			plotOptions: {
				pie: {
					allowPointSelect: true,
					cursor: 'pointer',
					dataLabels: {
						enabled: false
					},
					showInLegend: true
				}
			},
			series: [{
				type: 'pie',
				name: $scope.lang.expenses,
				data: data
			}]
		});
	};
	
	$scope.getTotal = function(expenses) {
		var total = 0;
		for (var i in expenses) {
			total = total + expenses[i].price;
		}
		return total.toFixed(2);
	};
	var date = new Date();
	$scope.showDate = {
		month: date.getMonth(),
		year: date.getFullYear()
	};
	
	var buildEmail = function(emailDetails, attachmentName) {
		return function(data) {
			var csvContents = 'Name,Price,Category,Day,Month,Year\n';
			for (var i in data) {
				var currExpense = data[i];
				csvContents = csvContents + [currExpense.name, currExpense.price, currExpense.category, currExpense.day, (currExpense.month + 1), currExpense.year].join(',') + '\n';
			}
			var base64Contents = base64.encode(csvContents);
			emailDetails["attachments"] = ['base64:' + attachmentName + '//' + base64Contents];
			window.plugin.email.open(emailDetails);
		};
	};
	
	$scope.exportCurrentMonth = function() {
		var emailDetails = {
			subject: [$scope.lang.expensesFor, $scope.months[$scope.showDate.month], $scope.showDate.year].join(' '),
			body: [$scope.lang.findAttachedExpenses, $scope.months[$scope.showDate.month], $scope.showDate.year, $scope.lang.asGeneratedByExpenseMe].join(' ') + '.'
		};
		var attachmentName = 'Expenses_' + ($scope.showDate.month + 1) + '_' + $scope.showDate.year + '.csv';
		getExpensesFromDb($scope.showDate.year, $scope.showDate.month, buildEmail(emailDetails, attachmentName));
	};
	
	$scope.exportCurrentYear = function() {
		var emailDetails = {
			subject: [$scope.lang.expensesFor, $scope.showDate.year].join(' '),
			body: [$scope.lang.findAttachedExpenses, $scope.showDate.year, $scope.lang.asGeneratedByExpenseMe].join(' ') + '.'
		};
		var attachmentName = 'Expenses_' + $scope.showDate.year + '.csv';
		getExpensesFromDb($scope.showDate.year, -1, buildEmail(emailDetails, attachmentName));
	};
	
});
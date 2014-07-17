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
	var updateScopeWithResults = function(days, data) {
		$scope.days = days;
		$scope.expenses = data;
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
	
	$scope.exportCurrentMonth = function() {
		$location.path("mailto:antousias@gmail.com?subject=Export for July&body=This is the body");
	};
	
	$scope.exportAllExpenses = function() {
	
	};
	
});
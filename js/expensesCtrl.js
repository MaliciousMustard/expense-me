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
		var csvContents = 'Name,Price,Category,Day,Month,Year\n';
		for (var i in $scope.expenses) {
			var currDay = $scope.expenses[i];
			for (var j in currDay) {
				var currExpense = currDay[j];
				csvContents = csvContents + [currExpense.name, currExpense.price, currExpense.category, currExpense.day, (currExpense.month + 1), currExpense.year].join(',') + '\n';
			}
		}
		var base64Contents = btoa(unescape(encodeURIComponent(csvContents)));
		window.plugin.email.open({
			subject: [$scope.lang.expensesFor, $scope.months[$scope.showDate.month], $scope.showDate.year].join(' '),
			body: [$scope.lang.findAttachedExpenses, $scope.months[$scope.showDate.month], $scope.showDate.year, $scope.lang.asGeneratedByExpenseMe].join(' ') + '.',
			attachments: ['base64:hello.csv//' + base64Contents]
		});
	};
	
	$scope.exportAllExpenses = function() {
		console.log($scope.showDate);
	};
	
});
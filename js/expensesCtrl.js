expenseMeApp.controller('ExpensesCtrl', function($scope) {
	$scope.iconPerCategory = [];
	for (i in categories) {
		$scope.iconPerCategory[categories[i].name] = categories[i].icon;
	}

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
		$(function () {
			var chart;
			
			$(document).ready(function () {
				
				// Build the chart
				$('#container').highcharts({
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
						name: 'Browser share',
						data: data
					}]
				});
			});
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
	getExpensesSummaryFromDb(date.getFullYear(), date.getMonth(), updatePieChartWithResults);
	getExpensesFromDb(date.getFullYear(), date.getMonth(), updateScopeWithResults);
});
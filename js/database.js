var db = undefined;

function openDb() {
	var newDb = openDatabase('expenseMeDb', '1.0', 'Expense Me DB', 50 * 1024 * 1024);
	newDb.transaction(function (tx) {  
		tx.executeSql('CREATE TABLE IF NOT EXISTS EXPENSES (timestamp unique, year, month, day, time, name, price, category, comments)');
	});
	return newDb;
}

function storeInDb(item, date) {
	if (!db) {
		db = openDb();
	}
	var time = (date.getHours() < 10 ? '0' : '') + date.getHours() + ':' + (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
	var comments = item.description ? '"' + item.description + '"' : '""';
	db.transaction(function (tx) {
		var sqlQuery = 'INSERT INTO EXPENSES (timestamp, year, month, day, time, name, price, category, comments) VALUES (' + date.getTime() + ', ' + date.getFullYear() + ', ' + date.getMonth() + ', ' + date.getDate() + ', "' + time + '", "' + item.name + '", ' + item.price + ', "' + item.category + '", ' + comments + ')';
		
		console.log(sqlQuery);
		tx.executeSql(sqlQuery);
	});
}

function getExpensesFromDb(year, month, callback) {
	if (!db) {
		db = openDb();
	}
	db.transaction(function (tx) {
		tx.executeSql('SELECT * FROM EXPENSES WHERE year = ' + year + ' AND month = ' + month + ' ORDER BY timestamp', [], function (tx, results) {
			var len = results.rows.length, i;
			var days = [];
			var data = [];
			var currentDay = 0;
			var currentDayStr = undefined;
			for (i = 0; i < len; i++){
				var currentItem = results.rows.item(i);
				if (currentItem.day != currentDay) {
					currentDayStr = months[currentItem.month] + ' ' + currentItem.day + ', ' + currentItem.year;
					days.push(currentDayStr);
					data[currentDayStr] = [];
					currentDay = currentItem.day;
				}
				data[currentDayStr].push(currentItem);
			}
			callback(days, data);
		}, null);
	});
}

function getExpensesSummaryFromDb(year, month, callback) {
	if (!db) {
		db = openDb();
	}
	db.transaction(function (tx) {
		tx.executeSql('SELECT name, SUM(price) AS price_sum FROM EXPENSES WHERE year = ' + year + ' AND month = ' + month + ' GROUP BY name', [], function (tx, results) {
			var len = results.rows.length, i;
			var data = [];
			for (i = 0; i < len; i++){
				var currentItem = results.rows.item(i);
				data.push([currentItem.name, currentItem.price_sum]);
			}
			callback(data);
		}, null);
	});
}
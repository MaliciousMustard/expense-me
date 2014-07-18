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
	var category = item.category ? '"' + item.category + '"' : null;
	db.transaction(function (tx) {
		var sqlQuery = 'INSERT INTO EXPENSES (timestamp, year, month, day, time, name, price, category, comments) VALUES (' + date.getTime() + ', ' + date.getFullYear() + ', ' + date.getMonth() + ', ' + date.getDate() + ', "' + time + '", "' + item.name + '", ' + item.price + ', ' + category + ', ' + comments + ')';
		
		tx.executeSql(sqlQuery);
	});
}

function getExpensesFromDb(year, month, callback) {
	if (!db) {
		db = openDb();
	}
	db.transaction(function (tx) {
		var args = [year];
		var monthQuery = '';
		if (month > -1) {
			args.push(month);
			monthQuery = ' AND month = ? ';
		}
		tx.executeSql('SELECT * FROM EXPENSES WHERE year = ? ' + monthQuery + ' ORDER BY timestamp', args, function (tx, results) {
			var len = results.rows.length, i;
			var data = [];
			for (i = 0; i < len; i++) {
				data.push(results.rows.item(i));
			}
			callback(data);
		}, null);
	});
}

function getExpensesSummaryFromDb(year, month, callback) {
	if (!db) {
		db = openDb();
	}
	db.transaction(function (tx) {
		tx.executeSql('SELECT name, SUM(price) AS price_sum FROM EXPENSES WHERE year = ?  AND month = ? GROUP BY name', [year, month], function (tx, results) {
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

function removeExpenseFromDb(expenseTimestamp) {
	if (!db) {
		db = openDb();
	}
	db.transaction(function(tx) {
		tx.executeSql('DELETE FROM EXPENSES WHERE timestamp=?', [expenseTimestamp]);
	});
}

function updateExpenseInDb(expense) {
	if (!db) {
		db = openDb();
	}
	db.transaction(function(tx) {
		tx.executeSql('UPDATE EXPENSES SET comments=?, price=?, category=? WHERE timestamp=?', [expense.comments, expense.price, expense.category, expense.timestamp]);
	});
}
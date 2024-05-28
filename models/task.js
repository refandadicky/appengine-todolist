var dbConn = require("../db");

var UserTask = function (task) {
	this.name = task.name || ' ';
	this.email = task.email || ' ';
	this.title = task.title || ' ';
	this.description = task.description || ' ';
	this.date_added = task.date_added || new Date().toISOString().slice(0, 19).replace('T', ' ');
	this.deadline = task.deadline || ' ';
	this.category = task.category || ' ';
	this.status = task.status || ' ';
};

UserTask.create = function (newTask, result) {
	dbConn.query(
		"INSERT INTO user_tasks (id, name, email, title, description, date_added, deadline, category, status) VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?)",
		[newTask.name, newTask.email, newTask.title, newTask.description, newTask.date_added, newTask.deadline, newTask.category, newTask.status],
		function (err, res) {
			if (err) {
				console.log("error: ", err);
				result(err, null);
			} else {
				console.log(res.insertId);
				result(null, res.insertId);
			}
		}
	);
};

UserTask.findAll = function (result) {
	dbConn.query("SELECT * FROM user_tasks", function (err, res) {
		if (err) {
			console.log("error: ", err);
			result(null, err);
		} else {
			console.log("Tasks: ", res);
			result(null, res);
		}
	});
};

UserTask.findById = function (id, result) {
	dbConn.query("SELECT * FROM user_tasks WHERE id = ?", [id], function (err, res) {
		if (err) {
			console.log("error: ", err);
			result(err, null);
		} else {
			console.log("Task: ", res);
			result(null, res);
		}
	});
};

UserTask.update = function (id, task, result) {
	dbConn.query(
		"UPDATE user_tasks SET name=?, email=?, title=?, description=?, date_added=?, deadline=?, category=?, status=? WHERE id = ?",
		[task.name, task.email, task.title, task.description, task.date_added, task.deadline, task.category, task.status, id],
		function (err, res) {
			if (err) {
				console.log("error: ", err);
				result(null, err);
			} else {
				result(null, res);
			}
		}
	);
};

UserTask.delete = function (id, result) {
	dbConn.query("DELETE FROM user_tasks WHERE id = ?", [id], function (err, res) {
		if (err) {
			console.log("error: ", err);
			result(null, err);
		} else {
			result(null, res);
		}
	});
};

module.exports = UserTask;

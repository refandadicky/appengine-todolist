const UserTask = require("../models/task");

exports.findAllTasks = function (req, res) {
	UserTask.findAll(function (err, tasks) {
		if (err) res.send(err);
		res.send(tasks);
	});
};

exports.createTask = function (req, res) {
	const new_task = new UserTask(req.body);
	if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
		res.status(400).send({
			error: true,
			message: "Please provide all required fields",
		});
	} else {
		UserTask.create(new_task, function (err, task) {
			if (err) res.send(err);
			res.json({
				error: false,
				message: "Task added successfully!",
				data: task,
			});
		});
	}
};

exports.findTaskById = function (req, res) {
	UserTask.findById(req.params.id, function (err, task) {
		if (err) res.send(err);
		res.json(task);
	});
};

exports.updateTask = function (req, res) {
	if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
		res.status(400).send({
			error: true,
			message: "Please provide all required fields",
		});
	} else {
		UserTask.update(req.params.id, new UserTask(req.body), function (err, task) {
			if (err) res.send(err);
			res.json({
				error: false,
				message: "Task updated successfully!",
			});
		});
	}
};

exports.deleteTask = function (req, res) {
	UserTask.delete(req.params.id, function (err, task) {
		if (err) res.send(err);
		res.json({
			error: false,
			message: "Task deleted successfully!",
		});
	});
};

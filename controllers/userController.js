const User = require("../models/user");

exports.findAllUsers = function (req, res) {
	User.findAll(function (err, users) {
		if (err) res.send(err);
		res.send(users);
	});
};

exports.createUser = function (req, res) {
	const new_user = new User(req.body);
	if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
		res.status(400).send({
			error: true,
			message: "Please provide all required fields",
		});
	} else {
		User.create(new_user, function (err, user) {
			if (err) res.send(err);
			res.json({
				error: false,
				message: "User added successfully!",
				data: user,
			});
		});
	}
};

exports.findUserById = function (req, res) {
	User.findById(req.params.id, function (err, user) {
		if (err) res.send(err);
		res.json(user);
	});
};

exports.updateUser = function (req, res) {
	if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
		res.status(400).send({
			error: true,
			message: "Please provide all required fields",
		});
	} else {
		User.update(req.params.id, new User(req.body), function (err, user) {
			if (err) res.send(err);
			res.json({
				error: false,
				message: "User updated successfully!",
			});
		});
	}
};

exports.deleteUser = function (req, res) {
	User.delete(req.params.id, function (err, user) {
		if (err) res.send(err);
		res.json({
			error: false,
			message: "User deleted successfully!",
		});
	});
};

exports.loginUser = function (req, res) {
	const { email, password } = req.body;
	User.login(email, password, function (err, user) {
		if (err) res.send(err);
		if (user) {
			res.json({
				error: false,
				message: "Login successful!",
				data: user,
			});
		} else {
			res.status(401).json({
				error: true,
				message: "Invalid email or password",
			});
		}
	});
};
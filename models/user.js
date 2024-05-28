const dbConn = require("../db");

var User = function (user) {
	this.name = user.name;
	this.email = user.email;
	this.phone = user.phone;
	this.password = user.password;
};

User.create = function (newUser, result) {
	dbConn.query(
		"INSERT INTO users (name, email, phone, password) VALUES (?,?,?,?)",
		[newUser.name, newUser.email, newUser.phone, newUser.password],
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

User.findAll = function (result) {
	dbConn.query("SELECT * FROM users", function (err, res) {
		if (err) {
			console.log("error: ", err);
			result(null, err);
		} else {
			console.log("Users: ", res);
			result(null, res);
		}
	});
};

User.findById = function (id, result) {
	dbConn.query("SELECT * FROM users WHERE id = ?", [id], function (err, res) {
		if (err) {
			console.log("error: ", err);
			result(err, null);
		} else {
			console.log("User: ", res);
			result(null, res);
		}
	});
};

User.update = function (id, user, result) {
	dbConn.query(
		"UPDATE users SET name=?, email=?, phone=?, password=? WHERE id = ?",
		[user.name, user.email, user.phone, user.password, id],
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

User.delete = function (id, result) {
	dbConn.query("DELETE FROM users WHERE id = ?", [id], function (err, res) {
		if (err) {
			console.log("error: ", err);
			result(null, err);
		} else {
			result(null, res);
		}
	});
};

User.login = function (email, password, result) {
	dbConn.query(
		"SELECT * FROM users WHERE email = ? AND password = ?",
		[email, password],
		function (err, res) {
			if (err) {
				console.log("error: ", err);
				result(err, null);
			} else if (res.length > 0) {
				result(null, res[0]);
			} else {
				result(null, null);
			}
		}
	);
};


module.exports = User;

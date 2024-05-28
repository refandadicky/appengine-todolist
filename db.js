const mysql = require("mysql2");

const dbConn = mysql.createConnection({
	host: "34.128.68.236",
	user: "root",
	password: "tugasakhir",
	database: "projectakhircc_db",
});


dbConn.connect(function (err) {
	if (err) throw err;
	console.log("Database Connected!");
});

module.exports = dbConn;
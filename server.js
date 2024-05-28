const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const PORT = 8080;

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// Mengimpor rute
const userRoutes = require("./routes/userRoutes");
const taskRoutes = require("./routes/taskRoutes");

// Menggunakan rute
app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});

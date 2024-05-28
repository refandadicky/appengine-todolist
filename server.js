import express from "express"
import cors from "cors"
import userRoutes from "./routes/userRoutes.js"
import taskRoutes from "./routes/taskRoutes.js"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
dotenv.config();
const PORT = 3000;

const app = express();
app.use(cookieParser());
app.use(cors());
app.use(express.json());



// Use routes
app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

import express from "express";
import {
    getTask,
    getTaskById,
    createTask,
    updateTask,
    deleteTask
} from "../controllers/taskController.js";

import {verifyToken} from "../middleware/verifyToken.js"

const router = express.Router();

//endpoint table user
router.get('/task', verifyToken, getTask);
router.get('/task/:id', verifyToken, getTaskById);
router.post('/task/add', verifyToken, createTask);
router.put('/task/update/:id', verifyToken, updateTask);
router.delete('/task/delete/:id', verifyToken, deleteTask);

export default router;
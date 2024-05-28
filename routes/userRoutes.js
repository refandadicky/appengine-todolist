import express from "express";
import {
    getUserById,
    Register,
    updateUser,
    deleteUser,
    loginhandler,
    initialEnpoint,
    logout,
    getUser
} from "../controllers/userController.js";

import {verifyToken} from "../middleware/verifyToken.js"
import { authToken } from "../controllers/authController.js";

const router = express.Router();

router.get('/', initialEnpoint);


//endpoint akses token
router.get('/token', authToken);

//endpoint table user
router.get('/users', verifyToken, getUser);
router.post('/login', loginhandler);
router.post('/register', Register);
router.get('/profile/:id', verifyToken, getUserById);
router.put('/profile/update/:id', verifyToken, updateUser);
router.delete('/profile/delete/:id', verifyToken, deleteUser);
router.delete('/logout', verifyToken, logout);

export default router;
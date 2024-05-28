const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// Rute untuk operasi CRUD pada tabel `users`
router.get("/", userController.findAllUsers);
router.post("/", userController.createUser);
router.get("/:id", userController.findUserById);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);
router.post("/login", userController.loginUser);

module.exports = router;

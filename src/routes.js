const express = require("express");
const router = express.Router();
const UserController = require("./Controllers/UserController.js");

router.get("/users", UserController.getAllUsers);
router.post("/user", UserController.createUser);
router.put("/user/:id", UserController.updateUser);
router.delete("/user/:id", UserController.deleteUser);

module.exports = router;
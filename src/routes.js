const express = require("express");
const router = express.Router();
const UserControllers = require("./controllers/UserControllers");

router.get("/users", UserControllers.getAllUsers);
router.post("/user", UserControllers.createUser);
router.put("/user/:id", UserControllers.updateUser);
router.delete("/user/:id", UserControllers.deleteUser);

module.exports = router;
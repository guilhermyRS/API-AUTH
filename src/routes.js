const express = require("express");
const router = express.Router();
const UserControllers = require("./controllers/UserControllers");

router.get("/users", UserControllers.getAllUsers);

module.exports = router;
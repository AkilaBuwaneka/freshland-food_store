const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

router.post("/", userController.addUser);
router.get("/:email", userController.getUserByEmail);

module.exports = router;

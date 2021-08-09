const express = require("express");

const auth = require("../middleware/auth");

const router = express.Router();

const userCtrl = require("../controllers/user.js");

router.post("/signup", userCtrl.signup);

router.post("/login", userCtrl.login);

router.delete("/delete", userCtrl.delete);

module.exports = router;

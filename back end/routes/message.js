const express = require("express");

const router = express.Router();

const messagesCtrl = require("../controllers/message");

const auth = require("../middleware/auth");

const multer = require("../middleware/multer-config");

router.post("/", auth, multer, messagesCtrl.create);

router.get("/", messagesCtrl.getAllMessage);

router.put("/:id", auth, multer, messagesCtrl.modifyOneMessage);

router.delete("/:id", auth, messagesCtrl.deleteOneMessage);

module.exports = router;

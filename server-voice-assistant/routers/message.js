const express = require("express");
const { createMessage, getMessages } = require("../controllers/message");
const auth = require("../middleware/auth");
const router = express.Router();

router.post("/createmessage", auth, createMessage);
router.get("/getmessage/:historyId", auth, getMessages);

module.exports = router;

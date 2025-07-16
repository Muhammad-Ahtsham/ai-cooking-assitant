const express = require("express");
const {
  getHistory,
  createHistory,
  historyDelete,
} = require("../controllers/history");
const auth = require("../middleware/auth");
const router = express.Router();
router.get("/gethistory", auth, getHistory);
router.post("/createhistory", auth, createHistory);
router.delete("/deletehistory/:id", auth, historyDelete);
module.exports = router;

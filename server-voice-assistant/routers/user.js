const express = require("express");
const router = express.Router();
const {signup, login, logout, getUser } = require("../controllers/user");
const auth = require("../middleware/auth");

router.post("/register", signup);
router.post("/login", login);
router.get("/logout", logout);
router.get("/getuser",auth, getUser);

module.exports = router;

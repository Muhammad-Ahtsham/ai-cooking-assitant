const express = require("express");
const router = express.Router();
const { singup, login, logout, getUser } = require("../controllers/user");
const auth = require("../middleware/auth");

router.post("/register", singup);
router.post("/login", login);
router.get("/logout", logout);
router.get("/getuser",auth, getUser);

module.exports = router;

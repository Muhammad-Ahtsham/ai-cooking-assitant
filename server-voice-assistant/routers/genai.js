const express = require("express");
const { geminiAi } = require("../controllers/genai");
const auth = require("../middleware/auth");
const router = express.Router();
router.post("/generate", auth, geminiAi);
module.exports = router;

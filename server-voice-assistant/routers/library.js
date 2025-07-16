const express = require("express");
const router = express.Router();

const { addTolibrary, getLibraryitem } = require("../controllers/library");
const auth = require("../middleware/auth");
router.get("/getlibraryitem", auth, getLibraryitem);
router.post("/addtolibrary", auth, addTolibrary);

module.exports = router;

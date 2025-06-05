const express = require("express");
const router = express.Router("router");
const commentsCtrl = require("../controllers/comments");
const ensureLoggedIn = require("../middleware/ensureLoggedIn");

// All paths start with '/api/posts'

// Protect all defined routes
router.use(ensureLoggedIn);

// GET /api/posts (INDEX action)
router.get("/", commentsCtrl.index);
// Post CREATE
router.post("/", commentsCtrl.create);

module.exports = router;

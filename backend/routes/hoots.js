const express = require("express");
const router = express.Router("router");
const hootsCtrl = require("../controllers/hoots");
const ensureLoggedIn = require("../middleware/ensureLoggedIn");

// All paths start with '/api/posts'

// Protect all defined routes
router.use(ensureLoggedIn);

// GET /api/posts (INDEX action)
router.get("/", hootsCtrl.index);

// Post CREATE
router.post("/", hootsCtrl.create);

//POST /api/hoots (CREATE action)
router.post("/", hootsCtrl.create);

//GET /api/hoots/:hootId (SHOW action)
router.get("/:hootId", hootsCtrl.show);

//GET /api/hoots/:hootId (UPDATE action)
router.put("/:hootId", hootsCtrl.update);

module.exports = router;

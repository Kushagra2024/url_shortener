const express = require("express");
const {
	handleCreateShortURL,
	handleGetOriginalURL,
	handleGetURLAnalytics,
} = require("../controllers/url.controller");

const router = express.Router();

// routes for "/shorturl"
router.route("/").post(handleCreateShortURL);
router.route("/:shortID").get(handleGetOriginalURL);
router.route("/analytics/:shortID").get(handleGetURLAnalytics);

module.exports = router;

const express = require("express");
const router = express.Router();

router.route("/").get((req, res) => {
	return res.render("index");
});

module.exports = router;

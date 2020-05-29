const express = require("express");
const router = express.Router();
const friends = require("../data/friends");
router
	.route("/friends")
	.get((req, res) => {
		res.json(friends);
	})
	.post((req, res) => {
		// console.log(req.body);
		let formInput = Object.values(req.body);
		console.log({ name: formInput.shift(), answers: formInput });
		res.redirect("/");
	});
module.exports = router;

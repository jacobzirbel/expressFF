const express = require("express");
const router = express.Router();
const friends = require("../data/friends");
router
	.route("/friends")
	.get((req, res) => {
		res.json(friends);
	})
	.post((req, res) => {
		let formInput = Object.values(req.body);
		let submitter = { name: formInput.shift(), answers: formInput };
		let bestMatch = getClosestMatch(submitter);
		friends.push(submitter);
		res.json(bestMatch);
	});

router.route("/delete/:id").get((req, res) => {
	if (friends[req.params.id]) friends.splice(req.params.id, 1);
	res.redirect("/api/all");
});
router.route("/all").get((req, res) => {
	res.json(friends);
});

module.exports = router;

function getClosestMatch(submitter) {
	let bestScore = -1;
	let bestFriend;

	friends.forEach((friend) => {
		let score = 100;
		let n = 0;
		while (n < submitter.answers.length) {
			score -= Math.abs(friend.answers[n] - submitter.answers[n]);
			n++;
		}
		if (score > bestScore) {
			bestFriend = friend;
			bestScore = score;
		}
	});

	return bestFriend;
}

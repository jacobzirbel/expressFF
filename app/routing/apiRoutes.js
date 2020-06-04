const express = require("express");
const router = express.Router();
const friends = require("../data/friends");
router
	.route("/friends")
	.get((req, res) => {
		res.json(friends);
	})
	.post((req, res) => {
		console.log(req.body);

		let [name, bio, ...answers] = req.body.values;
		let submitter = { name, bio, answers };
		let bestMatch = getTopMatches(submitter);
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
router.route("/clear").get((req, res) => {
	friends.length = 0;
	res.redirect("/");
});
module.exports = router;

function getTopMatches(submitter) {
	let scores = friends.map((friend) => {
		console.log(friend);
		let score = 100,
			n = 0,
			len = submitter.answers.length;
		while (n < len) {
			score -= Math.abs(friend.answers[n] - submitter.answers[n]);
			n++;
		}
		return { name: friend.name, bio: friend.bio, score };
	});
	let sortedScores = scores.sort((a, b) => b.score - a.score);
	if (sortedScores.length > 3) sortedScores.length = 3;
	console.log(sortedScores);
	return sortedScores;
}

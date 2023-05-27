const express = require("express");
const router = express.Router();
const { getNewPosts } = require("../utils/db");

router.get("/posts", getPosts);

async function getPosts(req, res) {
	const last = req.query.last;
	const posts = await getNewPosts(last);
	res.send({
		posts,
	});
}

module.exports = router;

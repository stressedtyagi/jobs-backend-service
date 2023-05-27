const express = require("express");
const chalk = require("chalk");
var router = express.Router();
const { ROOMS, EVENTS } = require("../constants");
const { addPostToDB } = require("../utils/db");

router.post("/update", handleServiceUpdate);

//***************************** ******************************/

async function handleServiceUpdate(req, res) {
	const io = req.app.get("socket.io");
	const { metaData, data } = req.body;
	const { name } = metaData;
	console.log(chalk.greenBright.italic(`${name} service update`));

	const dbPost = await addPostToDB(data);
	io.to(ROOMS[1]).emit(EVENTS.CLIENT_POST_UPDATE, dbPost);
	res.send({
		data: dbPost,
	});
}

/***************************************** */

module.exports = router;

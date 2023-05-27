require("dotenv").config();
const express = require("express");
const cors = require("cors");
const chalk = require("chalk");
const app = express();
const { Server } = require("socket.io");
const PORT = process.env.PORT || 3001;
const { verifyServiceJWT } = require("./middlewares/verifyJWT");

app.use(cors());

const server = app.listen(PORT, () => {
	console.log(chalk.greenBright(`\nServer running on port: ${PORT}`));
});
const io = new Server(server, {
	cors: {
		origins: "*:*",
		methods: ["GET", "POST"],
		allowedHeaders: ["content-type"],
		pingTimeout: 7000,
		pingInterval: 3000,
	},
});
app.set("socket.io", io);

const { ROOMS, EVENTS } = require("./constants");
// const { handleClientSocketConnection } = require("./utils/client_socket");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/service", verifyServiceJWT, require("./routes/service"));
app.use("/client", require("./routes/client"));

io.on("connection", async (socket) => {
	const params = socket.handshake?.query;
	const id = params.id;

	//TODO: Error handling
	/**
	 * payload.id in bare minimum for socket params
	 * room-id -> Client
	 * token -> TG/[other] Services
	 */
	if (!id) {
		socket.disconnect();
		return;
	}

	switch (ROOMS[id]) {
		case "CLIENT": {
			socket.join(ROOMS[id]);
			console.log(chalk.green.italic("Client Socket Established"));

			break;
		}

		default: {
			console.log(chalk.redBright.bold(`Invalid Socket-Room ID: ${id}`));
			socket.disconnect();
		}
	}
});

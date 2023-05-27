const jwt = require("jsonwebtoken");

function verifyServiceJWT(req, res, next) {
	const { token = null } = req.body;
	if (!token) {
		res.status(403).send({
			message: "Un-Authorised request!",
		});
	}

	try {
		const serviceMetaData = jwt.verify(
			token,
			process.env.service_token_secret
		);

		req.body.metaData = serviceMetaData;

		next();
	} catch {
		res.status(403).send({
			message: "Un-Authorised request!",
		});
	}
}

module.exports = { verifyServiceJWT };

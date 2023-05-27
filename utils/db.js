const { db } = require("../db");

const addPostToDB = async (data) => {
	const filteredData = filterData(data);
	const post = await db.post.create({
		data: filteredData,
	});
	return post;
};

async function getNewPosts(last) {
	const createdAt = isNaN(Date.parse(last))
		? {}
		: {
				gt: last,
				lt: new Date().toISOString(),
		  };

	const posts = await db.post.findMany({
		where: {
			createdAt,
		},
	});
	return posts;
}

const filterData = (data) => {
	/**
	 * title
	 * url
	 * date
	 * text
	 * icon
	 * image - not checking media buffer right now
	 */
	const { date, text } = data;
	const response = { createdAt: date, text };

	response.title = data.title;
	response.image = data.image;
	response.icon = data.icon;
	response.url = data.url;

	return response;
};

module.exports = {
	addPostToDB,
	getNewPosts,
};

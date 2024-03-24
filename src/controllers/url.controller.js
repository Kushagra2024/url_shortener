const ShortUniqueId = require("short-unique-id");
const ShortURL = require("../models/url.model");

const { randomUUID } = new ShortUniqueId();

async function handleCreateShortURL(req, res) {
	try {
		const body = req.body;

		if (!body.fullURL) {
			return res.status(404).json({ error: "URL is required" });
		}

		const response = await ShortURL.find({ originalURL: body.fullURL });

		let shortID = null;

		if (response.length === 0) {
			shortID = randomUUID();

			await ShortURL.create({
				shortID: shortID,
				originalURL: body.fullURL,
				watchHistory: [],
			});
		} else {
			shortID = response[0].shortID;
		}

		const fullUrl = `${req.protocol}://${req.get("host")}${
			req.originalUrl
		}`;

		const data = {
			shortID: shortID,
			shortURL: `${fullUrl}/${shortID}`,
			fullURL: body.fullURL,
		};

		return res.status(200).render("display_shortened_url", data);
	} catch (error) {
		console.log(error.message);
		process.exit(1);
	}
}

async function handleGetOriginalURL(req, res) {
	try {
		const shortID = req.params.shortID;

		if (!shortID) {
			return res.status(400).json({ error: "short ID is required" });
		}

		const timeStamp = new Date().toLocaleString();

		const response = await ShortURL.findOneAndUpdate(
			{
				shortID,
			},
			{
				$push: {
					visitHistory: {
						timeStamp: timeStamp,
					},
				},
			}
		);
		return res.status(200).redirect(response.originalURL);
	} catch (error) {
		console.log(error.message);
		process.exit(1);
	}
}

async function handleGetURLAnalytics(req, res) {
	try {
		const shortID = req.params.shortID;

		const response = await ShortURL.findOne({ shortID });

		const fullUrl = `${req.protocol}://${req.get(
			"host"
		)}${req.originalUrl.replace("/analytics", "")}`;

		return res.status(200).render("analytics", {
			shortURL: fullUrl,
			originalURL: response.originalURL,
			visitCount: response.visitHistory.length,
		});
	} catch (error) {
		console.log(error.message);
		process.exit(1);
	}
}

module.exports = {
	handleCreateShortURL,
	handleGetOriginalURL,
	handleGetURLAnalytics,
};

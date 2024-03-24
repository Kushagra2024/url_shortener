const { Schema, model } = require("mongoose");

const urlSchema = new Schema(
	{
		shortID: {
			type: String,
			required: true,
		},
		originalURL: {
			type: String,
			required: true,
			unique: true,
		},
		visitHistory: [
			{
				timeStamp: {
					type: String,
					required: true,
				},
			},
		],
	},
	{ timestamps: true }
);

const ShortURL = model("ShortURL", urlSchema);

module.exports = ShortURL;

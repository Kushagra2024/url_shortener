const mongoose = require("mongoose");

const DB_NAME = "url_shortener";

async function connectDB() {
	try {
		const connectionInstance = await mongoose.connect(
			`${process.env.MONGODB_URL}${DB_NAME}`
		);
		console.log("MongoDB connected successfully");
		return connectionInstance;
	} catch (error) {
		throw error;
	}
}

module.exports = connectDB;

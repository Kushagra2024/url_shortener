// Module Import
require("dotenv").config();
const connectDB = require("./db/connection");
const app = require("./app");

// Routers
const shortUrlRoute = require("./routes/shortUrl.route");
const staticRoute = require("./routes/static.route");

// Constants
const PORT = process.env.PORT || 3000;

// DB & Server Connection
connectDB()
	.then(() => {
		app.listen(PORT, () => {
			console.log(`Server listening on PORT: ${PORT}`);
		});
	})
	.catch((error) => {
		console.log(error.message);
	});

// Routes
app.use("/", staticRoute);
app.use("/shorturl", shortUrlRoute);

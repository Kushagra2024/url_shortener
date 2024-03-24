const generateBtn = document.querySelector("#generateBtn");
const urlInput = document.querySelector("#urlInput");
const copyBtn = document.querySelector("#copyBtn");
const shortUrlDisplay = document.querySelector("#shortUrlDisplay");
const analyticsBtn = document.querySelector("#showAnalyticsBtn");
const regenerateBtn = document.querySelector("#regenerateBtn");

generateBtn?.addEventListener("click", (event) => {
	if (!urlInput.value) {
		event.preventDefault();
	}
});

copyBtn?.addEventListener("click", (event) => {
	event.preventDefault();

	shortUrlDisplay.select();

	navigator.clipboard.writeText(shortUrlDisplay.value);
});

analyticsBtn?.addEventListener("click", function () {
	const shortID = this.getAttribute("data-shortId");

	const analyticsUrl = `/shorturl/analytics/${shortID}`;

	window.location.href = analyticsUrl;
});

regenerateBtn?.addEventListener("click", () => {
	console.log("hii");
	window.location.href = "/";
});

const { defineConfig } = require("cypress");

module.exports = defineConfig({
	e2e: {
		baseUrl: "https://sqlzoo.net/wiki/",
		specPattern: "cypress/e2e/**/*.js",
		retries: { runMode: 2, openMode: 2 },
		setupNodeEvents(on, config) {
			// implement node event listeners here
		},
	},
});

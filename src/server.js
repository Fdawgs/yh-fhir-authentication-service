const autoLoad = require("fastify-autoload");
const fp = require("fastify-plugin");
const path = require("path");

// Import plugins
const auth = require("fastify-auth");
const cors = require("fastify-cors");
const helmet = require("fastify-helmet");
const helmConfig = require("helmet");
const disableCache = require("fastify-disablecache");

/**
 * @author Frazer Smith
 * @description Build Fastify instance
 * @param {Function} server - Fastify instance.
 * @param {object} config - Fastify configuration values
 */
async function plugin(server, config) {
	// Enable plugins
	server
		.register(auth)
		// Use CORS: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
		.register(cors, config.cors)

		.register(disableCache)

		// Use Helmet to set response security headers: https://helmetjs.github.io/
		.register(helmet, {
			contentSecurityPolicy: {
				directives: {
					...helmConfig.contentSecurityPolicy.getDefaultDirectives(),
					"form-action": ["'self'"],
				},
			},
		})

		.register(autoLoad, {
			dir: path.join(__dirname, "routes"),
			options: config,
		});
}

module.exports = fp(plugin);

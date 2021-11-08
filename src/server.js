const autoLoad = require("fastify-autoload");
const fp = require("fastify-plugin");
const path = require("upath");

// Import plugins
const accepts = require("fastify-accepts");
const auth = require("fastify-auth");
const disableCache = require("fastify-disablecache");
const flocOff = require("fastify-floc-off");
const helmet = require("fastify-helmet");
const rateLimit = require("fastify-rate-limit");
const sensible = require("fastify-sensible");
const underPressure = require("under-pressure");
const jwtJwks = require("./plugins/jwt-jwks-auth");
const sharedSchemas = require("./plugins/shared-schemas");

/**
 * @author Frazer Smith
 * @description Build Fastify instance.
 * @param {Function} server - Fastify instance.
 * @param {object} config - Fastify configuration values.
 */
async function plugin(server, config) {
	// Register plugins
	server
		// Accept header handler
		.register(accepts)

		// Set response headers to disable client-side caching
		.register(disableCache)

		// Opt-out of Google's FLoC advertising-surveillance network
		.register(flocOff)

		// Use Helmet to set response security headers: https://helmetjs.github.io/
		.register(helmet, config.helmet);

	await server
		// Rate limiting and 429 response handling
		.register(rateLimit, config.rateLimit);

	server
		// Utility functions and error handlers
		.register(sensible)

		// Re-usable schemas
		.register(sharedSchemas)

		// Process load and 503 response handling
		.register(underPressure, config.processLoad);

	server
		// Ensure rate limit also applies to 4xx and 5xx responses
		.addHook("onSend", server.rateLimit())

		/*
		 * `x-xss-protection` and `content-security-policy` is set by default.
		 * These are only useful for HTML/XML content; the only CSP directive that
		 * is of use to other content is "frame-ancestors 'none'" to stop responses
		 * from being wrapped in iframes and used for clickjacking attacks.
		 */
		.addHook("onSend", async (req, res) => {
			/* istanbul ignore else */
			if (
				res.getHeader("content-type") !== undefined &&
				!res.getHeader("content-type")?.includes("html") &&
				!res.getHeader("content-type")?.includes("xml")
			) {
				res.raw.setHeader(
					"content-security-policy",
					"default-src 'self';frame-ancestors 'none'"
				);
				res.raw.removeHeader("x-xss-protection");
			}
			return res;
		})

		// Import and register admin routes
		.register(autoLoad, {
			dir: path.joinSafe(__dirname, "routes", "admin"),
			options: { ...config, prefix: "admin" },
		})

		/**
		 * Encapsulate plugins and routes into secured child context, so that admin and docs
		 * routes do not inherit auth and JWT plugins.
		 * See https://www.fastify.io/docs/latest/Encapsulation/ for more info
		 */
		.register(async (securedContext) => {
			securedContext
				// Multi-Auth handler (bearer token and JWT)
				.register(auth)
				.register(jwtJwks, config.jwt)
				// Import and register service routes
				.register(autoLoad, {
					dir: path.joinSafe(__dirname, "routes", "redirect"),
					dirNameRoutePrefix: false,
					options: config,
				});
		});
}

module.exports = fp(plugin, { fastify: "3.x", name: "server" });

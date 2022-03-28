const autoLoad = require("fastify-autoload");
const fp = require("fastify-plugin");
const path = require("upath");

// Import plugins
const accepts = require("fastify-accepts");
const auth = require("fastify-auth");
const bearer = require("fastify-bearer-auth");
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
 * @param {object} server - Fastify instance.
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
		.register(helmet, config.helmet)

		// Utility functions and error handlers
		.register(sensible, { errorHandler: false })

		// Re-usable schemas
		.register(sharedSchemas)

		// Process load and 503 response handling
		.register(underPressure, config.processLoad);

	await server
		// Rate limiting and 429 response handling
		.register(rateLimit, config.rateLimit);

	// Register routes
	server
		/*
		 * `x-xss-protection` and `content-security-policy` is set by default by Helmet.
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
				res.raw
					.setHeader(
						"content-security-policy",
						"default-src 'self';frame-ancestors 'none'"
					)
					.removeHeader("x-xss-protection");
			}
			return res;
		})

		// Import and register admin routes
		.register(autoLoad, {
			dir: path.joinSafe(__dirname, "routes", "admin"),
			options: { ...config, prefix: "admin" },
		})

		/**
		 * Encapsulate plugins and routes into secured child context, so that admin
		 * routes do not inherit auth plugins.
		 * See https://www.fastify.io/docs/latest/Encapsulation/ for more info
		 */
		.register(async (securedContext) => {
			const authFunctions = [];

			// JWKS JWT auth
			if (config.jwt) {
				await securedContext.register(jwtJwks, config.jwt);

				authFunctions.push(securedContext.verifyJWT);
			}

			// Bearer token auth
			if (config.bearerTokenAuthKeys) {
				await securedContext.register(bearer, {
					addHook: false,
					keys: config.bearerTokenAuthKeys,
					errorResponse:
						/* istanbul ignore next */
						(err) => ({
							statusCode: 401,
							error: "Unauthorized",
							message: err.message,
						}),
				});

				authFunctions.push(securedContext.verifyBearerAuth);
			}

			// If any auth scheme has been registered then register auth plugin and hook
			if (authFunctions.length > 0) {
				await securedContext.register(auth);
				await securedContext.addHook(
					"preHandler",
					securedContext.auth(authFunctions)
				);
			}

			securedContext
				// Import and register service routes
				.register(autoLoad, {
					dir: path.joinSafe(__dirname, "routes", "redirect"),
					dirNameRoutePrefix: false,
					options: config,
				});
		})

		// Rate limit 404 responses
		.setNotFoundHandler(
			{
				preHandler: server.rateLimit(),
			},
			(req, res) => {
				res.notFound(`Route ${req.method}:${req.url} not found`);
			}
		)

		// Errors thrown by routes and plugins are caught here
		.setErrorHandler(
			// eslint-disable-next-line promise/prefer-await-to-callbacks
			(err, req, res) => {
				/* istanbul ignore if */
				if (res.statusCode >= 500) {
					req.log.error({ req, res, err }, err && err.message);
					res.internalServerError();
				} else {
					req.log.info({ req, res, err }, err && err.message);
					res.send(err);
				}
			}
		);
}

module.exports = fp(plugin, { fastify: "3.x", name: "server" });

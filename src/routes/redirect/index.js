// Import plugins
const replyFrom = require("fastify-reply-from");
const bearer = require("fastify-bearer-auth").internals.factory;
const cors = require("fastify-cors");

const { redirectGetSchema } = require("./schema");

/**
 * @author Frazer Smith
 * @description Sets routing options for server.
 * @param {Function} server - Fastify instance.
 * @param {object} options - Route config values.
 * @param {Array|Set} options.bearerTokenAuthKeys - Array of accepted bearer tokens.
 * @param {object} options.cors - CORS settings.
 * @param {string} options.redirectUrl - URL and port the Mirth Connect FHIR/HTTP Listener channel is listening on.
 */
async function route(server, options) {
	// Use CORS: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
	server.register(cors, {
		...options.cors,
		methods: ["GET"],
		hideOptionsRoute: true,
	});

	server.register(replyFrom, {
		base: options.redirectUrl,
		undici: {
			connections: 100,
			pipelining: 10,
		},
	});

	server.addHook("preValidation", async (req, res) => {
		if (
			// Catch unsupported Accept header media types
			!redirectGetSchema.produces.includes(
				req.accepts().type(redirectGetSchema.produces)
			)
		) {
			res.notAcceptable();
		}
	});

	const opts = {
		method: "GET",
		schema: redirectGetSchema,
		preHandler: server.auth([
			server.verifyJWT,
			bearer({
				keys: options.bearerTokenAuthKeys,
				errorResponse: (err) => ({
					statusCode: 401,
					error: "Unauthorized",
					message: err.message,
				}),
			}),
		]),
		handler(req, res) {
			res.from(req.url, {
				onResponse: (request, reply, targetResponse) => {
					// Remove CORS origin set by Mirth Connect
					reply.removeHeader("access-control-allow-origin");
					// Set CORS origin
					if (options.cors.origin) {
						let origin = options.cors.origin;

						if (
							origin === true &&
							req.headers.origin !== undefined
						) {
							origin = req.headers.origin;
						}

						reply.header("access-control-allow-origin", origin);

						/**
						 * Remove header if CORS is set to reflect request origin
						 * but request origin header missing
						 */
						if (
							origin === true &&
							req.headers.origin === undefined
						) {
							reply.removeHeader("access-control-allow-origin");
						}
					}

					/**
					 * Remove headers set by Mirth Connect that are either inaccurate
					 * or pose security risks
					 */
					reply.removeHeader("etag");
					reply.removeHeader("server");
					reply.removeHeader("location");
					reply.removeHeader("last-modified");

					reply.removeHeader("access-control-allow-headers");
					reply.removeHeader("access-control-allow-methods");
					reply.removeHeader("access-control-expose-headers");

					reply.send(targetResponse);
				},
			});
		},
	};

	// Longest STU3 FHIR resource name is 'ImmunizationRecommendation' at 26 chars
	server.get("/STU3/:resource", {
		operationId: "searchFHIRResource",
		...opts,
	});
	server.get("/STU3/:resource/:id", {
		operationId: "readFHIRResource",
		...opts,
	});
}

module.exports = route;

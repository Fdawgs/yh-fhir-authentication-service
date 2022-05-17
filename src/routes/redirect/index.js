// Import plugins
const replyFrom = require("@fastify/reply-from");
const cors = require("@fastify/cors");

const { redirectGetSchema } = require("./schema");

/**
 * @author Frazer Smith
 * @description Sets routing options for server.
 * @param {object} server - Fastify instance.
 * @param {object} options - Route config values.
 * @param {object} options.cors - CORS settings.
 * @param {string} options.redirectUrl - URL and port the Mirth Connect FHIR/HTTP Listener channel is listening on.
 */
async function route(server, options) {
	// Register plugins
	server
		// Enable CORS if options passed
		.register(cors, {
			...options.cors,
			methods: ["GET"],
		});

	await server.register(replyFrom, {
		base: new URL(options.redirectUrl).href,
		// See undici options https://github.com/nodejs/undici/blob/main/docs/api/Agent.md#parameter-agentoptions
		undici: {
			connections: 128,
			pipelining: 1,
		},
	});

	const opts = {
		method: "GET",
		schema: redirectGetSchema,
		preValidation: async (req, res) => {
			if (
				// Catch unsupported Accept header media types
				!req.accepts().type(redirectGetSchema.produces)
			) {
				throw res.notAcceptable();
			}
		},
		handler: (req, res) => {
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
					reply.removeHeader("access-control-allow-headers");
					reply.removeHeader("access-control-allow-methods");
					reply.removeHeader("access-control-expose-headers");
					reply.removeHeader("etag");
					reply.removeHeader("last-modified");
					reply.removeHeader("location");
					reply.removeHeader("server");

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

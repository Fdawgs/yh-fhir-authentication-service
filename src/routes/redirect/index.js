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
 * @param {object} options.redirect - @fastify/reply-from plugin options.
 */
async function route(server, options) {
	// Register plugins
	server
		// Enable CORS if options passed
		.register(cors, {
			...options.cors,
			methods: ["GET"],
		});

	await server.register(replyFrom, options.redirect);

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
					const { origin, credentials } = options.cors;
					const reqOrigin = req?.headers?.origin;
					if (origin && reqOrigin !== undefined) {
						let acaOrigin;

						// Reflect request origin
						if (origin === true) {
							acaOrigin = reqOrigin;
						}

						if (origin === "*" && credentials === undefined) {
							acaOrigin = "*";
						}

						if (
							(Array.isArray(origin) &&
								origin.includes(reqOrigin)) ||
							origin === reqOrigin
						) {
							acaOrigin = reqOrigin;
						}

						reply.header("access-control-allow-origin", acaOrigin);
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

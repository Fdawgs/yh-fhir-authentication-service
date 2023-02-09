// Import plugins
const replyFrom = require("@fastify/reply-from");
const cors = require("@fastify/cors");

const { forwardGetSchema } = require("./schema");

const accepts = forwardGetSchema.produces;

/**
 * @author Frazer Smith
 * @description Sets routing options for server.
 * @param {object} server - Fastify instance.
 * @param {object} options - Route config values.
 * @param {*=} options.bearerTokenAuthKeys- Apply `bearerToken` security scheme to route if defined.
 * @param {object} options.cors - CORS settings.
 * @param {object} options.forward - @fastify/reply-from plugin options.
 * @param {*=} options.jwt- Apply `jwtBearerToken` security scheme to route if defined.
 */
async function route(server, options) {
	if (options.bearerTokenAuthKeys || options.jwt) {
		forwardGetSchema.security = [];
		forwardGetSchema.response[401] = {
			$ref: "responses#/properties/unauthorized",
			description: "Unauthorized",
		};

		if (options.bearerTokenAuthKeys) {
			forwardGetSchema.security.push({ bearerToken: [] });
		}

		if (options.jwt) {
			forwardGetSchema.security.push({ jwtBearerToken: [] });
		}
	}

	// Register plugins
	await server
		// Enable CORS if options passed
		.register(cors, {
			...options.cors,
			methods: ["GET", "HEAD"],
		})
		.register(replyFrom, options.forward);

	const opts = {
		method: "GET",
		schema: forwardGetSchema,
		onRequest: async (req) => {
			if (
				// Catch unsupported Accept header media types
				!req.accepts().type(accepts)
			) {
				throw server.httpErrors.notAcceptable();
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

						if (origin === "*" && !credentials) {
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

	server.route({
		url: "/STU3/:resource",
		...opts,
		schema: {
			operationId: "searchFHIRResource",
			...opts.schema,
		},
	});
	server.route({
		url: "/STU3/:resource/:id",
		...opts,
		schema: {
			operationId: "readFHIRResource",
			...opts.schema,
		},
	});
}

module.exports = route;

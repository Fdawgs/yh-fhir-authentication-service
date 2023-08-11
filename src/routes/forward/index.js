"use strict";

// Import plugins
const replyFrom = require("@fastify/reply-from");
const cors = require("@fastify/cors");

const { forwardGetSchema } = require("./schema");

const accepts = forwardGetSchema.produces;

/**
 * @author Frazer Smith
 * @description Sets routing options for server.
 * @param {import("fastify").FastifyInstance} server - Fastify instance.
 * @param {object} options - Route config values.
 * @param {*} [options.bearerTokenAuthKeys] - Apply `bearerToken` security scheme to route if defined.
 * @param {*} [options.jwt] - Apply `jwtBearerToken` security scheme to route if defined.
 * @param {object} options.cors - CORS settings.
 * @param {boolean|string|string[]} options.cors.origin - Access-Control-Allow-Origin header value.
 * @param {boolean} options.cors.credentials - Whether to send Access-Control-Allow-Credentials header.
 * @param {object} options.forward - @fastify/reply-from plugin options.
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
				onResponse: (_request, reply, targetResponse) => {
					// Remove CORS origin set by Mirth Connect
					reply.removeHeader("access-control-allow-origin");

					// Set CORS origin
					const { origin, credentials } = options.cors;
					const reqOrigin = req.headers?.origin;
					if (origin && reqOrigin) {
						let acaOrigin;

						// Reflect request origin
						if (origin === true) {
							acaOrigin = reqOrigin;
						}

						/**
						 * Cannot use wildcard with credentials for security reasons.
						 * See https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Origin
						 */
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
					reply
						.removeHeader("access-control-allow-headers")
						.removeHeader("access-control-allow-methods")
						.removeHeader("access-control-expose-headers")
						.removeHeader("etag")
						.removeHeader("last-modified")
						.removeHeader("location")
						.removeHeader("server")
						.send(targetResponse);
				},
			});
		},
	};

	server.route({
		url: "/STU3/:resource",
		...opts,
		schema: {
			summary: "Search FHIR STU3 resources",
			description:
				"Forwards to the URL set with the `FORWARD_URL` environment variable, which should return one or more FHIR STU3 resources.",
			operationId: "searchFhirStu3Resource",
			...opts.schema,
		},
	});
	server.route({
		url: "/STU3/:resource/:id",
		...opts,
		schema: {
			summary: "Read FHIR STU3 resource",
			description:
				"Forwards to the URL set with the `FORWARD_URL` environment variable, which should return a single FHIR STU3 resource.",
			operationId: "readFhirStu3Resource",
			...opts.schema,
		},
	});
}

module.exports = route;

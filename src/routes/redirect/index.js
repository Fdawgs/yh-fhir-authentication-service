const fp = require("fastify-plugin");

// Import plugins
const replyFrom = require("fastify-reply-from");
const bearer = require("fastify-bearer-auth").internals.factory;
// const jwtJwks = require("../../utils/jwt-jwks-auth");

const { redirectGetSchema } = require("./schema");

/**
 * @author Frazer Smith
 * @description Sets routing options for server.
 * @param {Function} server - Fastify instance.
 * @param {object} options - Object containing route config objects.
 */
async function route(server, options) {
	server.register(replyFrom, {
		base: options.redirectUrl,
		undici: {
			connections: 100,
			pipelining: 10,
		},
	});

	server.route({
		method: "GET",
		// Longest STU3 FHIR resource name is 'ImmunizationRecommendation' at 26 chars
		url: "/STU3/*",
		schema: redirectGetSchema,
		preHandler: server.auth([
			// jwtJwks(options.jwt),
			bearer({ keys: options.authKeys }),
		]),
		handler(req, rep) {
			rep.from(req.url, {
				onResponse: (request, reply, targetResponse) => {
					/**
					 * Remove headers set by Mirth Connect that are either inaccurate
					 * or pose security risks
					 */
					reply.removeHeader("etag");
					reply.removeHeader("server");
					reply.removeHeader("location");
					reply.removeHeader("last-modified");

					reply.send(targetResponse);
				},
			});
		},
	});
}

module.exports = fp(route);

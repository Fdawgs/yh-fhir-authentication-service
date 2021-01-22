const fp = require("fastify-plugin");

// Import plugins
const bearer = require("fastify-bearer-auth").internals.factory;
const jwtJwks = require("../../utils/jwt-jwks-auth");

const { wildcardGetSchema } = require("./schema");

/**
 * @author Frazer Smith
 * @description Sets routing options for server.
 * @param {Function} server - Fastify instance.
 * @param {object} options - Object containing route config objects.
 */
async function route(server, options) {
	server.route({
		method: "GET",
		// Longest STU3 FHIR resource name is 'ImmunizationRecommendation' at 26 chars
		url: "/*",
		schema: wildcardGetSchema,
		preHandler: server.auth([
			jwtJwks(options.jwt),
			bearer({ keys: options.authKeys }),
		]),
		async handler(req, res) {
			res.send(req.query);
		},
	});
}

module.exports = fp(route);

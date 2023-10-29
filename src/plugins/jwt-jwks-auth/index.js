"use strict";

const fp = require("fastify-plugin");
const buildGetJwks = require("get-jwks");
const { createVerifier, createDecoder } = require("fast-jwt");

const getJwks = buildGetJwks({
	providerDiscovery: true, // Automatically obtain jwks_uri from the OpenID Provider Discovery Endpoint
	ttl: 900000, // Cache for 15 mins
});
const jwtDecoder = createDecoder({ complete: true });

// Cache immutable regex as they are expensive to create and garbage collect
const bearerRegex = /^bearer /iu;

/**
 * @author Frazer Smith
 * @description Decorator plugin that adds `verifyJWT` function
 * to authenticate JWTs using JWKS endpoint.
 * @param {import("fastify").FastifyInstance} server - Fastify instance instance.
 * @param {object[]} options - Plugin config values.
 * @param {string} options[].issuerDomain - URI of accepted principal that issued JWT.
 * @param {string|string[]} [options[].allowedAudiences] - Accepted recipient(s) that JWT is intended for.
 * @param {import("fast-jwt").Algorithm[]} [options[].allowedAlgorithms] - Accepted signing algorithm(s).
 * @param {string|string[]} [options[].allowedSubjects] - Accepted subjects(s).
 * @param {number} [options[].maxAge] - The maximum allowed age for tokens to still be valid.
 */
async function plugin(server, options) {
	/**
	 * @author Frazer Smith
	 * @description Verifies JWT using JWKS endpoint.
	 * @param {import("fastify").FastifyRequest} req - Fastify request instance.
	 */
	async function verifyJwt(req) {
		const header = req.headers.authorization;
		if (!header) {
			throw server.httpErrors.unauthorized(
				"missing authorization header"
			);
		}

		// Remove 'Bearer' from beginning of token
		const token = header.replace(bearerRegex, "").trim();

		// JWT header always starts with "ey", which is "{" base64 encoded
		if (token.slice(0, 2) === "ey") {
			try {
				// Allow through aslong as the JWT is verified by atleast one JWKS public key
				await Promise.any(
					options.map(async (element) => {
						const { alg, kid } = jwtDecoder(token).header || {};

						/**
						 * Verifier config options explicitly defined as functionality not tested;
						 * will stop changes to defaults in dependency from affecting auth
						 */
						return createVerifier({
							algorithms: element.allowedAlgorithms,
							allowedAud: element.allowedAudiences,
							allowedIss: element.issuerDomain,
							allowedSub: element.allowedSubjects,
							cacheTTL: 600000, // Cache for 10 mins
							clockTimestamp: Date.now(),
							clockTolerance: 0,
							errorCacheTTL: 600000,
							ignoreExpiration: false,
							ignoreNotBefore: false,
							key: await getJwks.getPublicKey({
								domain: element.issuerDomain,
								alg,
								kid,
							}),
							maxAge: element.maxAge,
						})(token);
					})
				);
			} catch (err) {
				/**
				 * Retrieve and log errors from Promise.any()'s AggregateError,
				 * assists in diagnosing connection issues to JWKS endpoints
				 */
				if (err instanceof AggregateError) {
					err.errors.forEach((element) => {
						if (
							element.message !==
							"No matching JWK found in the set."
						) {
							req.log.error(
								{ req, err: element },
								element.message
							);
						}
					});
				} else {
					req.log.error({ req, err }, "Error verifying JWT");
				}

				// @fastify/auth turns this into a 401 response
				throw new Error("invalid authorization header");
			}
		} else {
			// @fastify/auth turns this into a 401 response
			throw new Error("invalid authorization header");
		}
	}

	server.decorate("verifyJWT", verifyJwt);
}

module.exports = fp(plugin, {
	fastify: "4.x",
	name: "jwt-jwks-auth",
	dependencies: ["@fastify/sensible"],
});

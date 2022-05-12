/* eslint-disable promise/prefer-await-to-callbacks */
const fp = require("fastify-plugin");
const buildGetJwks = require("get-jwks");
const { createVerifier, createDecoder } = require("fast-jwt");

const getJwks = buildGetJwks({
	providerDiscovery: true, // Automatically obtain jwks_uri from the OpenID Provider Discovery Endpoint
});
const jwtDecoder = createDecoder({ complete: true });

/**
 * @author Frazer Smith
 * @description Decorator plugin that adds `verifyJWT` function
 * to authenticate JWTs using JWKS endpoint.
 * @param {object} server - Fastify instance.
 * @param {object[]} options - Plugin config values.
 * @param {string} options[].issuerDomain - URI of accepted principal that issued JWT.
 * @param {string|Array=} options[].allowedAudiences - Accepted recipient(s) that JWT is intended for.
 * @param {Array=} options[].allowedAlgorithms - Accepted signing algorithm(s).
 * @param {string|Array=} options[].allowedSubjects - Accepted subjects(s).
 * @param {string=} options[].maxAge - The maximum allowed age for tokens to still be valid.
 */
async function plugin(server, options) {
	server.decorate("verifyJWT", async (req, res) => {
		const header = req.headers.authorization;
		if (!header) {
			res.badRequest("Missing authorization header");
		}

		// Remove 'Bearer' from beginning of token
		const token = header.replace(/^Bearer/, "").trim();

		try {
			// Allow through aslong as the JWT is verified by atleast one JWKS public key
			await Promise.any(
				options.map(async (element) => {
					const publicKey = await getJwks.getPublicKey({
						domain: element.issuerDomain,
						alg: jwtDecoder(token).header.alg,
						kid: jwtDecoder(token).header.kid,
					});

					/**
					 * Verifier config options explicitly defined as functionality not tested;
					 * will stop changes to defaults in dependency from impacting auth
					 */
					const jwtVerifier = createVerifier({
						algorithms: element?.allowedAlgorithms,
						allowedAud: element?.allowedAudiences,
						allowedIss: element.issuerDomain,
						allowedSub: element?.allowedSubjects,
						cache: true,
						cacheTTL: 600000, // 10 mins
						clockTimestamp: Date.now(),
						clockTolerance: 0,
						ignoreExpiration: false,
						ignoreNotBefore: false,
						key: publicKey,
						maxAge: element?.maxAge,
					});

					await jwtVerifier(token);
				})
			);
		} catch (err) {
			throw new Error("invalid authorization header");
		}
	});
}

module.exports = fp(plugin, {
	fastify: "3.x",
	name: "jwt-jwks-auth",
	dependencies: ["fastify-sensible"],
});

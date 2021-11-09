/* eslint-disable promise/prefer-await-to-callbacks */
const fp = require("fastify-plugin");
const jwt = require("jsonwebtoken");
const jwksClient = require("jwks-rsa");

/**
 * @author Frazer Smith
 * @author Mark Hunt
 * @description Retrieve signing key.
 * @param {string} token - JSON web token.
 * @param {string} jwksUri - Endpoint containing JSON Web Key Set (JWKS).
 * @returns {Promise<string>} Signing key on resolve, error text on rejection.
 */
async function getSigningKey(token, jwksUri) {
	return new Promise((resolve, reject) => {
		const client = jwksClient({
			strictSsl: true, // Default value
			jwksUri,
		});

		const decoded = jwt.decode(token, { complete: true });

		client.getSigningKey(decoded.header.kid, (err, key) => {
			if (err) {
				reject(err);
			} else {
				const signingKey = key.publicKey || key.rsaPublicKey;
				resolve(signingKey);
			}
		});
	});
}

/**
 * @author Frazer Smith
 * @description Decorator plugin that adds `verifyJWT` function
 * to authenticate JWTs using JWKS endpoint.
 * @param {Function} server - Fastify instance.
 * @param {object} options - Plugin config values.
 * @param {string} options.jwksEndpoint - URL of endpoint containing JWKS public keys.
 * @param {string|Array} options.allowedAudiences - Accepted recipient(s) that JWT is intended for.
 * @param {Array} options.allowedAlgorithms - Accepted signing algorithm(s).
 * @param {string|Array} options.allowedIssuers - Accepted principal(s) that issued JWT.
 * @param {string} options.maxAge - The maximum allowed age for tokens to still be valid.
 */
async function plugin(server, options) {
	server.decorate("verifyJWT", async (req, res) => {
		const header = req.headers.authorization;
		if (!header) {
			throw res.badRequest("Missing authorization header");
		}

		// Remove 'Bearer' from beginning of token
		const token = header.substring(6).trim();

		const signingKey = await getSigningKey(token, options.jwksEndpoint);

		jwt.verify(
			token,
			signingKey,
			{
				audience: options.allowedAudiences,
				algorithms: options.allowedAlgorithms,
				ignoreExpiration: false,
				issuer: options.allowedIssuers,
				maxAge: options.maxAge,
			},
			(err) => {
				if (err) {
					throw err;
				}
			}
		);
	});
}

module.exports = fp(plugin, {
	fastify: "3.x",
	name: "jwt-jwks-auth",
	dependencies: ["fastify-sensible"],
});

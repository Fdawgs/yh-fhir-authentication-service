/* eslint-disable promise/prefer-await-to-callbacks */
const fp = require("fastify-plugin");
const jwt = require("jsonwebtoken");
const jwksClient = require("jwks-rsa");

/**
 * @author Mark Hunt
 * @author Frazer Smith
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
 * @param {object} options - Fastify config values.
 */
async function plugin(server, options) {
	server.decorate("verifyJWT", async (req) => {
		const header = req.headers.authorization;
		if (!header) {
			throw new Error("missing authorization header");
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

module.exports = fp(plugin, { fastify: "3.x" });

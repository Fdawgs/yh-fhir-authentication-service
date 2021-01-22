/* eslint-disable promise/prefer-await-to-callbacks */
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
 * @description Authenticate JWT using JWKS endpoint.
 * @param {object} options -
 * @returns {Function} callback.
 */
module.exports = function jwtJwksAuth(options) {
	return async (req, res, next) => {
		const header = req.raw.headers.authorization;
		if (!header) {
			next(new Error("missing authorization header"));
		}

		// Remove 'Bearer' from beginning of token
		const token = header.substring(6).trim();
		try {
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
					return next();
				}
			);
		} catch (err) {
			next(err);
		}
	};
};

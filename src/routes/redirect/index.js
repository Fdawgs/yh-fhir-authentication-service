const fp = require("fastify-plugin");
const { NotAcceptable } = require("http-errors");

// Import plugins
const replyFrom = require("fastify-reply-from");
const bearer = require("fastify-bearer-auth").internals.factory;
const cors = require("fastify-cors");

const { redirectGetSchema } = require("./schema");

/**
 * @author Frazer Smith
 * @description Sets routing options for server.
 * @param {Function} server - Fastify instance.
 * @param {object} options - Object containing route config objects.
 */
async function route(server, options) {
	server.addHook("preHandler", async (req, res) => {
		if (!["json", "xml"].includes(req.accepts().type(["json", "xml"]))) {
			res.send(NotAcceptable());
		}
	});

	// Use CORS: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
	server.register(cors, {
		...options.cors,
		methods: ["GET"],
		hideOptionsRoute: true,
	});

	server.register(replyFrom, {
		base: options.redirectUrl,
		undici: {
			connections: 100,
			pipelining: 10,
		},
	});

	const opts = {
		method: "GET",
		schema: redirectGetSchema,
		preHandler: server.auth([
			server.verifyJWT,
			bearer({ keys: options.authKeys }),
		]),
		handler(req, res) {
			res.from(req.url, {
				onResponse: (request, reply, targetResponse) => {
					// Set CORS origin
					if (options.cors.origin) {
						let origin = options.cors.origin;

						if (origin === true) {
							origin = req.headers.origin || "*";
						}

						reply.header("access-control-allow-origin", origin);
					}

					/**
					 * Remove headers set by Mirth Connect that are either inaccurate
					 * or pose security risks
					 */
					reply.removeHeader("etag");
					reply.removeHeader("server");
					reply.removeHeader("location");
					reply.removeHeader("last-modified");

					reply.removeHeader("access-control-allow-headers");
					reply.removeHeader("access-control-allow-methods");
					reply.removeHeader("access-control-expose-headers");

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

module.exports = fp(route);

"use strict";

require("dotenv").config();

const { readFile } = require("node:fs/promises");
const addFormats = require("ajv-formats").default;
const envSchema = require("env-schema");
const { getStream } = require("file-stream-rotator");
const S = require("fluent-json-schema").default;
const { stdSerializers, stdTimeFunctions } = require("pino");
const { parse: secureParse } = require("secure-json-parse");
const { dirname, joinSafe, normalizeTrim } = require("upath");

const { license, version } = require("../../package.json");

/**
 * @author Frazer Smith
 * @description Converts string boolean to boolean
 * or comma-delimited string to array.
 * @param {string} param - CORS parameter.
 * @returns {boolean|string|string[]} CORS parameter.
 */
function parseCorsParameter(param) {
	if (param?.toLowerCase().trim() === "true") {
		return true;
	}
	if (param?.toLowerCase().trim() === "false") {
		return false;
	}
	if (param?.includes(",")) {
		return param
			.trim()
			.split(",")
			.map((value) => value.trim());
	}
	return param;
}

/**
 * @author Frazer Smith
 * @description Validates environment variables and build server config.
 * @returns {Promise<object>} A promise that resolves with a server config object, or rejects with an `Error` object
 * if HTTPS is enabled and the required files are not found.
 */
async function getConfig() {
	// Validate env variables
	const env = envSchema({
		ajv: {
			// Use customOptions to support custom formats and keywords
			/* istanbul ignore next: env-schema functions not explicitly tested */
			customOptions(ajvInstance) {
				addFormats(ajvInstance);
				return ajvInstance;
			},
		},
		dotenv: true,
		schema: S.object()
			.additionalProperties(false)
			.prop("NODE_ENV", S.string())

			// Service
			.prop("HOST", S.string())
			.prop("PORT", S.anyOf([S.number(), S.null()]))
			.prop("FORWARD_URL", S.string().format("uri"))

			// CORS
			.prop("CORS_ORIGIN", S.anyOf([S.string(), S.null()]))
			.prop("CORS_ALLOWED_HEADERS", S.anyOf([S.string(), S.null()]))
			.prop("CORS_ALLOW_CREDENTIALS", S.anyOf([S.boolean(), S.null()]))
			.prop("CORS_EXPOSED_HEADERS", S.anyOf([S.string(), S.null()]))
			.prop("CORS_MAX_AGE", S.anyOf([S.number(), S.null()]))

			// HTTPS
			.prop("HTTPS_PFX_PASSPHRASE", S.anyOf([S.string(), S.null()]))
			.prop("HTTPS_PFX_FILE_PATH", S.anyOf([S.string(), S.null()]))
			.prop("HTTPS_SSL_CERT_PATH", S.anyOf([S.string(), S.null()]))
			.prop("HTTPS_SSL_KEY_PATH", S.anyOf([S.string(), S.null()]))
			.prop("HTTPS_HTTP2_ENABLED", S.anyOf([S.boolean(), S.null()]))

			// Logger
			.prop(
				"LOG_LEVEL",
				S.anyOf([
					S.string().enum([
						"fatal",
						"error",
						"warn",
						"info",
						"debug",
						"trace",
						"silent",
					]),
					S.null(),
				])
			)
			.prop("LOG_ROTATION_DATE_FORMAT", S.anyOf([S.string(), S.null()]))
			.prop("LOG_ROTATION_FILENAME", S.anyOf([S.string(), S.null()]))
			.prop(
				"LOG_ROTATION_FREQUENCY",
				S.anyOf([
					// daily, date, [1-12]h, or [1-30]m
					S.string().pattern(
						/^(?:daily|date|(?:[1-9]|1[012])h|(?:[1-9]|[12]\d|30)m)$/u
					),
					S.null(),
				])
			)
			.prop("LOG_ROTATION_MAX_LOGS", S.anyOf([S.string(), S.null()]))
			.prop("LOG_ROTATION_MAX_SIZE", S.anyOf([S.string(), S.null()]))

			// Process load handling
			.prop(
				"PROC_LOAD_MAX_EVENT_LOOP_DELAY",
				S.anyOf([S.number(), S.null()])
			)
			.prop(
				"PROC_LOAD_MAX_EVENT_LOOP_UTILIZATION",
				S.anyOf([S.number(), S.null()])
			)
			.prop(
				"PROC_LOAD_MAX_HEAP_USED_BYTES",
				S.anyOf([S.number(), S.null()])
			)
			.prop("PROC_LOAD_MAX_RSS_BYTES", S.anyOf([S.number(), S.null()]))

			// Rate limiting
			.prop(
				"RATE_LIMIT_EXCLUDED_ARRAY",
				S.anyOf([S.string().pattern(/^\[.*\]$/u), S.null()])
			)
			.prop(
				"RATE_LIMIT_MAX_CONNECTIONS_PER_MIN",
				S.anyOf([S.number(), S.null()])
			)

			// Bearer token auth
			.prop(
				"AUTH_BEARER_TOKEN_ARRAY",
				S.anyOf([S.string().pattern(/^\[\{.*\}\]$/u), S.null()])
			)

			// JWT auth
			.prop(
				"JWT_JWKS_ARRAY",
				S.anyOf([S.string().pattern(/^\[\{.*\}\]$/u), S.null()])
			)
			.required(["FORWARD_URL"]),
	});

	const config = {
		fastify: {
			port: env.PORT || 3000,
		},
		fastifyInit: {
			/**
			 * @see {@link https://fastify.io/docs/latest/Reference/Logging | Fastify logging}
			 * @see {@link https://getpino.io/#/docs/api | Pino API}
			 */
			logger: {
				formatters: {
					level(label) {
						return { level: label };
					},
				},
				level: env.LOG_LEVEL || "info",
				serializers: {
					/**
					 * @param {import("http").IncomingMessage} req - Request message.
					 * @returns {import("pino").SerializedRequest} Serialized request.
					 */
					/* istanbul ignore next: pino functions not explicitly tested */
					req(req) {
						return stdSerializers.req(req);
					},
					/**
					 * @param {import("http").ServerResponse<import("http").IncomingMessage>} res - Response message.
					 * @returns {import("pino").SerializedResponse} Serialized response.
					 */
					/* istanbul ignore next: pino functions not explicitly tested */
					res(res) {
						return {
							...stdSerializers.res(res),
							statusCode: res.statusCode,
						};
					},
				},
				timestamp: () => stdTimeFunctions.isoTime(),
			},
			ignoreTrailingSlash: true,
		},
		cors: {
			allowedHeaders: env.CORS_ALLOWED_HEADERS || null,
			credentials: env.CORS_ALLOW_CREDENTIALS === true,
			exposedHeaders: env.CORS_EXPOSED_HEADERS || null,
			hideOptionsRoute: true,
			maxAge: env.CORS_MAX_AGE || null,
			origin: parseCorsParameter(env.CORS_ORIGIN) || false,
		},
		processLoad: {
			maxEventLoopDelay: env.PROC_LOAD_MAX_EVENT_LOOP_DELAY || 0,
			maxEventLoopUtilization:
				env.PROC_LOAD_MAX_EVENT_LOOP_UTILIZATION || 0,
			maxHeapUsedBytes: env.PROC_LOAD_MAX_HEAP_USED_BYTES || 0,
			maxRssBytes: env.PROC_LOAD_MAX_RSS_BYTES || 0,
		},
		rateLimit: {
			allowList: env.RATE_LIMIT_EXCLUDED_ARRAY
				? secureParse(env.RATE_LIMIT_EXCLUDED_ARRAY)
				: null,
			continueExceeding: true,
			hook: "onSend",
			max: env.RATE_LIMIT_MAX_CONNECTIONS_PER_MIN || 1000,
			timeWindow: 60000,
		},
		helmet: {
			contentSecurityPolicy: {
				directives: {
					"default-src": ["'self'"],
					"base-uri": ["'self'"],
					"img-src": ["'self'", "data:"],
					"object-src": ["'none'"],
					"child-src": ["'self'"],
					"frame-ancestors": ["'none'"],
					"form-action": ["'self'"],
					"upgrade-insecure-requests": [],
					"block-all-mixed-content": [],
					"script-src": null,
					"script-src-attr": null,
					"style-src": null,
					"font-src": null,
				},
			},
			crossOriginEmbedderPolicy: false,
			crossOriginOpenerPolicy: false,
			crossOriginResourcePolicy: false,
			hsts: {
				maxAge: 31536000,
			},
			// Only supported by Chrome at time of writing
			originAgentCluster: false,
		},
		swagger: {
			openapi: {
				info: {
					title: "FHIR API Authentication Service",
					description:
						'<a href="https://somersetft.nhs.uk/yeovilhospital/">Yeovil Hospital</a>\'s FHIR API authentication service, a Node.js application using the <a href="https://fastify.io/">Fastify web framework</a>.',
					contact: {
						name: "Author",
						email: "frazer.smith@somersetft.nhs.uk",
					},
					license: {
						name: license,
						url: "https://raw.githubusercontent.com/Fdawgs/yh-fhir-authentication-service/main/LICENSE",
					},
					version,
					// Redoc specific extension to support loading image in docs
					"x-logo": {
						url: "/public/images/sft-s-logo-transparent-background-wide-canvas.png",
						backgroundColor: "#005EB8",
						altText: "Somerset NHS Foundation Trust Logo",
					},
				},
				// Components object populated by shared schemas at launch
				components: {
					securitySchemes:
						env.AUTH_BEARER_TOKEN_ARRAY || env.JWT_JWKS_ARRAY
							? {}
							: undefined,
				},
				tags: [
					{
						name: "Forwards",
						description:
							"Endpoints relating to forwarding to FHIR listener",
					},
					{
						name: "System administration",
						description: "",
					},
				],
			},
		},
		forward: {
			base: new URL(env.FORWARD_URL).href,
			// Disable logging of "fetching from remote server" and "response received" from remote server
			disableRequestLogging: true,
			/** @see {@link https://github.com/nodejs/undici/blob/main/docs/api/Agent.md#parameter-agentoptions | Undici Agent options} */
			undici: {
				connections: 128,
				pipelining: 1,
			},
		},
	};

	// Ensure API listens on both IPv4 and IPv6 addresses if not explicitly set
	if (env.HOST) {
		config.fastify.host = env.HOST;
	}

	// Enable HTTPS using cert/key or passphrase/pfx combinations
	if (env.HTTPS_SSL_CERT_PATH && env.HTTPS_SSL_KEY_PATH) {
		try {
			config.fastifyInit.https = {
				// eslint-disable-next-line security/detect-non-literal-fs-filename -- Filename not user-provided
				cert: await readFile(normalizeTrim(env.HTTPS_SSL_CERT_PATH)),
				// eslint-disable-next-line security/detect-non-literal-fs-filename -- Filename not user-provided
				key: await readFile(normalizeTrim(env.HTTPS_SSL_KEY_PATH)),
			};
		} catch (err) {
			throw new Error(
				`No such file or directory ${err.path} for SSL cert/key`
			);
		}
	}

	if (env.HTTPS_PFX_PASSPHRASE && env.HTTPS_PFX_FILE_PATH) {
		try {
			config.fastifyInit.https = {
				passphrase: env.HTTPS_PFX_PASSPHRASE,
				// eslint-disable-next-line security/detect-non-literal-fs-filename -- Filename not user-provided
				pfx: await readFile(normalizeTrim(env.HTTPS_PFX_FILE_PATH)),
			};
		} catch (err) {
			throw new Error(
				`No such file or directory ${err.path} for PFX file`
			);
		}
	}

	if (config.fastifyInit.https && env.HTTPS_HTTP2_ENABLED === true) {
		config.fastifyInit.https.allowHTTP1 = true;
		config.fastifyInit.http2 = true;
	}

	// Set Pino transport
	if (env.LOG_ROTATION_FILENAME) {
		const logFile = normalizeTrim(env.LOG_ROTATION_FILENAME);

		/** @see {@link https://github.com/rogerc/file-stream-rotator/#options | File stream rotator options} */
		config.fastifyInit.logger.stream = getStream({
			audit_file: joinSafe(dirname(logFile), ".audit.json"),
			date_format: env.LOG_ROTATION_DATE_FORMAT || "YYYY-MM-DD",
			filename: logFile,
			frequency: env.LOG_ROTATION_FREQUENCY || "daily",
			max_logs: env.LOG_ROTATION_MAX_LOGS,
			size: env.LOG_ROTATION_MAX_SIZE,
			verbose: false,
		});
	}

	// Bearer token auth
	if (env.AUTH_BEARER_TOKEN_ARRAY) {
		const keys = new Set();
		secureParse(env.AUTH_BEARER_TOKEN_ARRAY).forEach((element) => {
			keys.add(element.value);
		});
		config.bearerTokenAuthKeys = keys;

		config.swagger.openapi.components.securitySchemes.bearerToken = {
			type: "http",
			description:
				"Expects the request to contain an `Authorization` header with a bearer token.",
			scheme: "bearer",
			bearerFormat: "bearer <token>",
		};
	}

	// JWT auth
	if (env.JWT_JWKS_ARRAY) {
		config.jwt = secureParse(env.JWT_JWKS_ARRAY);

		config.swagger.openapi.components.securitySchemes.jwtBearerToken = {
			type: "http",
			description:
				"Expects the request to contain an `Authorization` header with a JWT.",
			scheme: "bearer",
			bearerFormat: "JWT",
		};
	}

	return config;
}

module.exports = getConfig;

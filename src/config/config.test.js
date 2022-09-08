const { faker } = require("@faker-js/faker/locale/en_GB");
const fs = require("fs/promises");
const glob = require("glob");
const getConfig = require(".");

describe("Configuration", () => {
	const currentEnv = { ...process.env };

	afterAll(async () => {
		const files = glob.sync("./test_resources/+(test-log*|.audit.json)", {
			dot: true,
		});

		// eslint-disable-next-line security/detect-non-literal-fs-filename
		await Promise.all(files.map((file) => fs.unlink(file)));
	});

	afterEach(() => {
		// Reset the process.env to default after each test
		Object.assign(process.env, currentEnv);
	});

	test("Should use defaults if values missing and return values according to environment variables", async () => {
		const NODE_ENV = "development";
		const HOST = faker.internet.ip();
		const PORT = faker.datatype.number();
		const SERVICE_REDIRECT_URL = "https://www.nhs.uk";
		const CORS_ORIGIN = "";
		const CORS_ALLOWED_HEADERS = "";
		const CORS_ALLOW_CREDENTIALS = "";
		const CORS_EXPOSED_HEADERS = "";
		const CORS_MAX_AGE = "";
		const HTTPS_SSL_CERT_PATH = "";
		const HTTPS_SSL_KEY_PATH = "";
		const HTTPS_HTTP2_ENABLED = "";
		const LOG_LEVEL = "";
		const LOG_ROTATION_DATE_FORMAT = "";
		const LOG_ROTATION_FILENAME = "./test_resources/test-log-%DATE%.log";
		const LOG_ROTATION_FREQUENCY = "";
		const PROC_LOAD_MAX_EVENT_LOOP_DELAY = "";
		const PROC_LOAD_MAX_EVENT_LOOP_UTILIZATION = "";
		const PROC_LOAD_MAX_HEAP_USED_BYTES = "";
		const PROC_LOAD_MAX_RSS_BYTES = "";
		const RATE_LIMIT_MAX_CONNECTIONS_PER_MIN = "";
		const RATE_LIMIT_EXCLUDED_ARRAY = '["127.0.0.1"]';
		const AUTH_BEARER_TOKEN_ARRAY = "";
		const JWT_JWKS_ARRAY = "";

		Object.assign(process.env, {
			NODE_ENV,
			HOST,
			PORT,
			SERVICE_REDIRECT_URL,
			CORS_ORIGIN,
			CORS_ALLOWED_HEADERS,
			CORS_ALLOW_CREDENTIALS,
			CORS_EXPOSED_HEADERS,
			CORS_MAX_AGE,
			HTTPS_SSL_CERT_PATH,
			HTTPS_SSL_KEY_PATH,
			HTTPS_HTTP2_ENABLED,
			LOG_LEVEL,
			LOG_ROTATION_DATE_FORMAT,
			LOG_ROTATION_FILENAME,
			LOG_ROTATION_FREQUENCY,
			PROC_LOAD_MAX_EVENT_LOOP_DELAY,
			PROC_LOAD_MAX_EVENT_LOOP_UTILIZATION,
			PROC_LOAD_MAX_HEAP_USED_BYTES,
			PROC_LOAD_MAX_RSS_BYTES,
			RATE_LIMIT_MAX_CONNECTIONS_PER_MIN,
			RATE_LIMIT_EXCLUDED_ARRAY,
			AUTH_BEARER_TOKEN_ARRAY,
			JWT_JWKS_ARRAY,
		});

		const config = await getConfig();

		expect(config.isProduction).toBe(false);

		expect(config.fastify).toEqual({
			host: HOST,
			port: PORT,
		});

		expect(config.fastifyInit.logger).toEqual({
			formatters: { level: expect.any(Function) },
			level: "info",
			serializers: {
				req: expect.any(Function),
				res: expect.any(Function),
			},
			timestamp: expect.any(Function),
			stream: expect.any(Object),
		});
		expect(config.fastifyInit.logger.formatters.level()).toEqual({
			level: undefined,
		});
		expect(config.fastifyInit.logger.timestamp().substring(0, 7)).toBe(
			',"time"'
		);

		expect(config.fastifyInit.https).toBeUndefined();
		expect(config.fastifyInit.http2).toBeUndefined();

		expect(config.cors).toEqual({
			origin: false,
			hideOptionsRoute: true,
		});

		expect(config.processLoad).toEqual({
			maxEventLoopDelay: 0,
			maxEventLoopUtilization: 0,
			maxHeapUsedBytes: 0,
			maxRssBytes: 0,
		});

		expect(config.rateLimit).toEqual({
			allowList: JSON.parse(RATE_LIMIT_EXCLUDED_ARRAY),
			continueExceeding: true,
			hook: "onSend",
			max: 1000,
			timeWindow: 60000,
		});

		expect(config.redirect).toEqual({
			base: `${SERVICE_REDIRECT_URL}/`,
			disableRequestLogging: true,
			undici: {
				connections: 128,
				pipelining: 1,
			},
		});

		expect(config.bearerTokenAuthKeys).toBeUndefined();

		expect(config.jwt).toBeUndefined();
	});

	test("Should return values according to environment variables - HTTPS (SSL cert) enabled, HTTP2 enabled, bearer token auth enabled, and JWKS JWT auth enabled", async () => {
		const NODE_ENV = "development";
		const HOST = faker.internet.ip();
		const PORT = faker.datatype.number();
		const SERVICE_REDIRECT_URL = "https://www.nhs.uk";
		const HTTPS_SSL_CERT_PATH =
			"./test_resources/test_ssl_cert/server.cert";
		const HTTPS_SSL_KEY_PATH = "./test_resources/test_ssl_cert/server.key";
		const HTTPS_HTTP2_ENABLED = true;
		const LOG_LEVEL = faker.helpers.arrayElement([
			"debug",
			"warn",
			"silent",
		]);
		const LOG_ROTATION_DATE_FORMAT = "YYYY-MM";
		const LOG_ROTATION_FILENAME = "./test_resources/test-log-%DATE%.log";
		const LOG_ROTATION_FREQUENCY = "custom";
		const LOG_ROTATION_MAX_LOGS = "1";
		const LOG_ROTATION_MAX_SIZE = "1g";
		const PROC_LOAD_MAX_EVENT_LOOP_DELAY = 1000;
		const PROC_LOAD_MAX_EVENT_LOOP_UTILIZATION = 0.98;
		const PROC_LOAD_MAX_HEAP_USED_BYTES = 100000000;
		const PROC_LOAD_MAX_RSS_BYTES = 100000000;
		const RATE_LIMIT_MAX_CONNECTIONS_PER_MIN = 2000;
		const RATE_LIMIT_EXCLUDED_ARRAY = '["127.0.0.1"]';
		const AUTH_BEARER_TOKEN_ARRAY =
			'[{"service": "test", "value": "testtoken"}]';
		const JWT_JWKS_ARRAY =
			'[{"issuerDomain": "https://not-real-issuer.ydh.nhs.uk/auth/realms/SIDER", "allowedAudiences": "ydh", "allowedAlgorithms": ["RS256"], "maxAge": 90000}]';

		Object.assign(process.env, {
			NODE_ENV,
			HOST,
			PORT,
			SERVICE_REDIRECT_URL,
			HTTPS_SSL_CERT_PATH,
			HTTPS_SSL_KEY_PATH,
			HTTPS_HTTP2_ENABLED,
			LOG_LEVEL,
			LOG_ROTATION_DATE_FORMAT,
			LOG_ROTATION_FILENAME,
			LOG_ROTATION_FREQUENCY,
			LOG_ROTATION_MAX_LOGS,
			LOG_ROTATION_MAX_SIZE,
			PROC_LOAD_MAX_EVENT_LOOP_DELAY,
			PROC_LOAD_MAX_EVENT_LOOP_UTILIZATION,
			PROC_LOAD_MAX_HEAP_USED_BYTES,
			PROC_LOAD_MAX_RSS_BYTES,
			RATE_LIMIT_MAX_CONNECTIONS_PER_MIN,
			RATE_LIMIT_EXCLUDED_ARRAY,
			AUTH_BEARER_TOKEN_ARRAY,
			JWT_JWKS_ARRAY,
		});

		const config = await getConfig();

		expect(config.isProduction).toBe(false);

		expect(config.fastify).toEqual({
			host: HOST,
			port: PORT,
		});

		expect(config.fastifyInit.logger).toEqual({
			formatters: { level: expect.any(Function) },
			level: LOG_LEVEL,
			serializers: {
				req: expect.any(Function),
				res: expect.any(Function),
			},
			timestamp: expect.any(Function),
			stream: expect.any(Object),
		});
		expect(config.fastifyInit.logger.formatters.level()).toEqual({
			level: undefined,
		});
		expect(config.fastifyInit.logger.timestamp().substring(0, 7)).toBe(
			',"time"'
		);

		expect(config.fastifyInit.https).toEqual({
			allowHTTP1: true,
			cert: expect.any(Buffer),
			key: expect.any(Buffer),
		});
		expect(config.fastifyInit.http2).toBe(true);

		expect(config.processLoad).toEqual({
			maxEventLoopDelay: PROC_LOAD_MAX_EVENT_LOOP_DELAY,
			maxEventLoopUtilization: PROC_LOAD_MAX_EVENT_LOOP_UTILIZATION,
			maxHeapUsedBytes: PROC_LOAD_MAX_HEAP_USED_BYTES,
			maxRssBytes: PROC_LOAD_MAX_RSS_BYTES,
		});

		expect(config.rateLimit).toEqual({
			allowList: JSON.parse(RATE_LIMIT_EXCLUDED_ARRAY),
			continueExceeding: true,
			hook: "onSend",
			max: RATE_LIMIT_MAX_CONNECTIONS_PER_MIN,
			timeWindow: 60000,
		});

		expect(config.redirect).toEqual({
			base: `${SERVICE_REDIRECT_URL}/`,
			disableRequestLogging: true,
			undici: {
				connections: 128,
				pipelining: 1,
			},
		});

		expect(config.bearerTokenAuthKeys).toContain("testtoken");

		expect(config.jwt).toEqual(JSON.parse(JWT_JWKS_ARRAY));
	});

	test("Should return values according to environment variables - HTTPS (PFX cert) enabled and HTTP2 enabled", async () => {
		const HOST = faker.internet.ip();
		const PORT = faker.datatype.number();
		const SERVICE_REDIRECT_URL = "https://www.nhs.uk";
		const HTTPS_PFX_FILE_PATH =
			"./test_resources/test_ssl_cert/server.cert"; // Not an actual PFX file
		const HTTPS_PFX_PASSPHRASE = faker.lorem.word();
		const HTTPS_HTTP2_ENABLED = true;
		const LOG_LEVEL = faker.helpers.arrayElement([
			"debug",
			"warn",
			"silent",
		]);

		Object.assign(process.env, {
			HOST,
			PORT,
			SERVICE_REDIRECT_URL,
			HTTPS_PFX_FILE_PATH,
			HTTPS_PFX_PASSPHRASE,
			HTTPS_HTTP2_ENABLED,
			LOG_LEVEL,
		});

		const config = await getConfig();

		expect(config.fastify).toEqual({
			host: HOST,
			port: PORT,
		});

		expect(config.fastifyInit.https).toEqual({
			allowHTTP1: true,
			passphrase: HTTPS_PFX_PASSPHRASE,
			pfx: expect.any(Buffer),
		});
		expect(config.fastifyInit.http2).toBe(true);
	});

	// CORS env variables
	test.each([
		{
			testName: "CORS origin set to true and credentials enabled",
			envVariables: {
				CORS_ORIGIN: true,
				CORS_ALLOW_CREDENTIALS: true,
			},
			expected: {
				origin: true,
				credentials: true,
			},
		},
		{
			testName: "CORS origin set to false",
			envVariables: {
				CORS_ORIGIN: false,
			},
			expected: {
				origin: false,
			},
		},
		{
			testName: "CORS origin set to comma-delimited string value",
			envVariables: {
				CORS_ORIGIN:
					"https://test1.ydh.nhs.uk, https://test2.ydh.nhs.uk",
			},
			expected: {
				origin: expect.arrayContaining([
					"https://test1.ydh.nhs.uk",
					"https://test2.ydh.nhs.uk",
				]),
			},
		},
		{
			testName: "CORS origin set to string value",
			envVariables: {
				CORS_ORIGIN: "https://ydh.nhs.uk",
			},
			expected: {
				origin: "https://ydh.nhs.uk",
			},
		},
	])(
		"Should return values according to environment variables - $testName",
		async ({ envVariables, expected }) => {
			const HOST = faker.internet.ip();
			const PORT = faker.datatype.number();
			const SERVICE_REDIRECT_URL = "https://www.nhs.uk";
			const CORS_ORIGIN = envVariables.CORS_ORIGIN;
			const CORS_ALLOWED_HEADERS =
				"Accept, Authorization, Content-Type, Origin, X-Requested-With";
			const CORS_ALLOW_CREDENTIALS =
				envVariables?.CORS_ALLOW_CREDENTIALS || "";
			const CORS_EXPOSED_HEADERS = "Location";
			const CORS_MAX_AGE = 10;
			const LOG_LEVEL = faker.helpers.arrayElement([
				"debug",
				"warn",
				"silent",
			]);

			Object.assign(process.env, {
				HOST,
				PORT,
				SERVICE_REDIRECT_URL,
				CORS_ORIGIN,
				CORS_ALLOWED_HEADERS,
				CORS_ALLOW_CREDENTIALS,
				CORS_EXPOSED_HEADERS,
				CORS_MAX_AGE,
				LOG_LEVEL,
			});

			const config = await getConfig();

			expect(config.fastify).toEqual({
				host: HOST,
				port: PORT,
			});

			expect(config.cors).toEqual({
				origin: expected.origin,
				allowedHeaders: CORS_ALLOWED_HEADERS,
				credentials: expected?.credentials,
				exposedHeaders: CORS_EXPOSED_HEADERS,
				hideOptionsRoute: true,
				maxAge: CORS_MAX_AGE,
			});
		}
	);

	// HTTPS cert path env variables
	test.each([
		{
			testName: "invalid PFX file path",
			envVariables: {
				HTTPS_PFX_FILE_PATH: "./test_resources/test_ssl_cert/error.pfx",
				HTTPS_PFX_PASSPHRASE: faker.lorem.word(),
			},
		},
		{
			testName: "invalid SSL cert file path",
			envVariables: {
				HTTPS_SSL_CERT_PATH:
					"./test_resources/test_ssl_cert/error.cert",
				HTTPS_SSL_KEY_PATH: "./test_resources/test_ssl_cert/error.key",
			},
		},
	])("Should throw error if $testName", async ({ envVariables }) => {
		const HOST = faker.internet.ip();
		const PORT = faker.datatype.number();
		const SERVICE_REDIRECT_URL = "https://www.nhs.uk";
		const HTTPS_SSL_KEY_PATH = envVariables?.HTTPS_SSL_KEY_PATH || "";
		const HTTPS_SSL_CERT_PATH = envVariables?.HTTPS_SSL_CERT_PATH || "";
		const HTTPS_PFX_FILE_PATH = envVariables?.HTTPS_PFX_FILE_PATH || "";
		const HTTPS_PFX_PASSPHRASE = envVariables?.HTTPS_PFX_PASSPHRASE || "";
		const LOG_LEVEL = faker.helpers.arrayElement([
			"debug",
			"warn",
			"silent",
		]);

		Object.assign(process.env, {
			HOST,
			PORT,
			SERVICE_REDIRECT_URL,
			HTTPS_SSL_CERT_PATH,
			HTTPS_SSL_KEY_PATH,
			HTTPS_PFX_FILE_PATH,
			HTTPS_PFX_PASSPHRASE,
			LOG_LEVEL,
		});

		await expect(getConfig()).rejects.toThrow();
	});
});

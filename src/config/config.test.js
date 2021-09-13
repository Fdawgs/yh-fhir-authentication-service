const faker = require("faker/locale/en_GB");
const fs = require("fs");
const glob = require("glob");
const getConfig = require(".");

describe("configuration", () => {
	const currentEnv = { ...process.env };

	beforeAll(() => {
		jest.resetModules();
	});

	afterAll(() => {
		const files = glob.GlobSync(`./test_resources/test_log*`).found;
		files.forEach((foundFile) => {
			fs.unlinkSync(foundFile);
		});
	});

	afterEach(() => {
		jest.resetModules();
		Object.assign(process.env, currentEnv);
	});

	test("Should return values according to environment variables - SSL enabled and CORS disabled", async () => {
		const NODE_ENV = "development";
		const SERVICE_HOST = faker.internet.ip();
		const SERVICE_PORT = faker.datatype.number();
		const SERVICE_REDIRECT_URL = "https://www.nhs.uk/?";
		const CORS_ORIGIN = false;
		const CORS_ALLOWED_HEADERS = "";
		const CORS_ALLOW_CREDENTIALS = "";
		const CORS_EXPOSED_HEADERS = "";
		const CORS_MAX_AGE = "";
		const HTTPS_SSL_CERT_PATH =
			"./test_resources/test_ssl_cert/server.cert";
		const HTTPS_SSL_KEY_PATH = "./test_resources/test_ssl_cert/server.key";
		const HTTPS_HTTP2_ENABLED = true;
		const LOG_LEVEL = faker.random.arrayElement([
			"debug",
			"warn",
			"silent",
		]);
		const LOG_ROTATION_DATE_FORMAT = "YYYY-MM";
		const LOG_ROTATION_FILENAME = "./test_resources/test_log";
		const LOG_ROTATION_FREQUENCY = "custom";
		const PROC_LOAD_MAX_EVENT_LOOP_DELAY = 1000;
		const PROC_LOAD_MAX_EVENT_LOOP_UTILIZATION = 0.98;
		const PROC_LOAD_MAX_HEAP_USED_BYTES = 100000000;
		const PROC_LOAD_MAX_RSS_BYTES = 100000000;
		const RATE_LIMIT_MAX_CONNECTIONS_PER_MIN = 2000;
		const RATE_LIMIT_EXCLUDED_ARRAY = '["127.0.0.1"]';
		const AUTH_BEARER_TOKEN_ARRAY =
			'[{"service": "test", "value": "testtoken"}]';
		const JWKS_ENDPOINT =
			"https://not-real-issuer.ydh.nhs.uk/auth/realms/SIDER/protocol/openid-connect/certs";
		const JWT_ALLOWED_AUDIENCE = "who-knows";
		const JWT_ALLOWED_ALGO_ARRAY = '["RS256"]';
		const JWT_ALLOWED_ISSUERS =
			"https://not-real-issuer.ydh.nhs.uk/auth/realms/SIDER";
		const JWT_MAX_AGE = "15m";

		Object.assign(process.env, {
			NODE_ENV,
			SERVICE_HOST,
			SERVICE_PORT,
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
			JWKS_ENDPOINT,
			JWT_ALLOWED_AUDIENCE,
			JWT_ALLOWED_ALGO_ARRAY,
			JWT_ALLOWED_ISSUERS,
			JWT_MAX_AGE,
		});

		const config = await getConfig();

		expect(config.isProduction).toEqual(false);

		expect(config.fastify).toEqual({
			host: SERVICE_HOST,
			port: SERVICE_PORT,
		});

		expect(config.fastifyInit.logger).toEqual(
			expect.objectContaining({
				formatters: { level: expect.any(Function) },
				level: LOG_LEVEL,
				serializers: {
					req: expect.any(Function),
					res: expect.any(Function),
				},
				timestamp: expect.any(Function),
				stream: expect.any(Object),
			})
		);
		expect(config.fastifyInit.logger.formatters.level()).toEqual({
			level: undefined,
		});
		expect(config.fastifyInit.logger.timestamp().substring(0, 7)).toEqual(
			',"time"'
		);

		expect(config.fastifyInit.https).toEqual({
			allowHTTP1: true,
			cert: expect.any(Buffer),
			key: expect.any(Buffer),
		});
		expect(config.fastifyInit.http2).toEqual(true);

		expect(config.cors).toEqual({
			origin: CORS_ORIGIN,
		});

		expect(config.processLoad).toEqual({
			maxEventLoopDelay: PROC_LOAD_MAX_EVENT_LOOP_DELAY,
			maxEventLoopUtilization: PROC_LOAD_MAX_EVENT_LOOP_UTILIZATION,
			maxHeapUsedBytes: PROC_LOAD_MAX_HEAP_USED_BYTES,
			maxRssBytes: PROC_LOAD_MAX_RSS_BYTES,
		});

		expect(config.rateLimit).toEqual({
			allowList: JSON.parse(RATE_LIMIT_EXCLUDED_ARRAY),
			max: RATE_LIMIT_MAX_CONNECTIONS_PER_MIN,
			timeWindow: 60000,
		});

		expect(config.redirectUrl).toEqual(SERVICE_REDIRECT_URL);

		expect(config.bearerTokenAuthKeys).toContain("testtoken");

		expect(config.jwt).toEqual({
			jwksEndpoint: JWKS_ENDPOINT,
			allowedAudiences: JWT_ALLOWED_AUDIENCE,
			allowedAlgorithms: expect.arrayContaining(["RS256"]),
			allowedIssuers: JWT_ALLOWED_ISSUERS,
			maxAge: JWT_MAX_AGE,
		});
	});

	test("Should use defaults if values missing and return values according to environment variables", async () => {
		const NODE_ENV = "development";
		const SERVICE_HOST = faker.internet.ip();
		const SERVICE_PORT = faker.datatype.number();
		const SERVICE_REDIRECT_URL = "https://www.nhs.uk/?";
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
		const LOG_ROTATION_FILENAME = "./test_resources/test_log";
		const LOG_ROTATION_FREQUENCY = "";
		const PROC_LOAD_MAX_EVENT_LOOP_DELAY = "";
		const PROC_LOAD_MAX_EVENT_LOOP_UTILIZATION = "";
		const PROC_LOAD_MAX_HEAP_USED_BYTES = "";
		const PROC_LOAD_MAX_RSS_BYTES = "";
		const RATE_LIMIT_MAX_CONNECTIONS_PER_MIN = "";
		const RATE_LIMIT_EXCLUDED_ARRAY = '["127.0.0.1"]';
		const AUTH_BEARER_TOKEN_ARRAY =
			'[{"service": "test", "value": "testtoken"}]';

		const JWKS_ENDPOINT =
			"https://not-real-issuer.ydh.nhs.uk/auth/realms/SIDER/protocol/openid-connect/certs";
		const JWT_ALLOWED_AUDIENCE = "who-knows";
		const JWT_ALLOWED_ALGO_ARRAY = '["RS256"]';
		const JWT_ALLOWED_ISSUERS =
			"https://not-real-issuer.ydh.nhs.uk/auth/realms/SIDER";
		const JWT_MAX_AGE = "15m";

		Object.assign(process.env, {
			NODE_ENV,
			SERVICE_HOST,
			SERVICE_PORT,
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
			JWKS_ENDPOINT,
			JWT_ALLOWED_AUDIENCE,
			JWT_ALLOWED_ALGO_ARRAY,
			JWT_ALLOWED_ISSUERS,
			JWT_MAX_AGE,
		});

		const config = await getConfig();

		expect(config.isProduction).toEqual(false);

		expect(config.fastify).toEqual({
			host: SERVICE_HOST,
			port: SERVICE_PORT,
		});

		expect(config.fastifyInit.logger).toEqual(
			expect.objectContaining({
				formatters: { level: expect.any(Function) },
				level: "info",
				serializers: {
					req: expect.any(Function),
					res: expect.any(Function),
				},
				timestamp: expect.any(Function),
				stream: expect.any(Object),
			})
		);
		expect(config.fastifyInit.logger.formatters.level()).toEqual({
			level: undefined,
		});
		expect(config.fastifyInit.logger.timestamp().substring(0, 7)).toEqual(
			',"time"'
		);

		expect(config.fastifyInit.https).toBeUndefined();
		expect(config.fastifyInit.http2).toBeUndefined();

		expect(config.cors).toEqual({
			origin: false,
		});

		expect(config.processLoad).toEqual({
			maxEventLoopDelay: 0,
			maxEventLoopUtilization: 0,
			maxHeapUsedBytes: 0,
			maxRssBytes: 0,
		});

		expect(config.rateLimit).toEqual({
			allowList: JSON.parse(RATE_LIMIT_EXCLUDED_ARRAY),
			max: 1000,
			timeWindow: 60000,
		});

		expect(config.redirectUrl).toEqual(SERVICE_REDIRECT_URL);

		expect(config.bearerTokenAuthKeys).toContain("testtoken");

		expect(config.jwt).toEqual({
			jwksEndpoint: JWKS_ENDPOINT,
			allowedAudiences: JWT_ALLOWED_AUDIENCE,
			allowedAlgorithms: expect.arrayContaining(["RS256"]),
			allowedIssuers: JWT_ALLOWED_ISSUERS,
			maxAge: JWT_MAX_AGE,
		});
	});

	test("Should return values according to environment variables - PFX enabled and CORS enabled", async () => {
		const SERVICE_HOST = faker.internet.ip();
		const SERVICE_PORT = faker.datatype.number();
		const SERVICE_REDIRECT_URL = "https://www.nhs.uk/?";
		const CORS_ORIGIN = true;
		const CORS_ALLOWED_HEADERS = "";
		const CORS_ALLOW_CREDENTIALS = true;
		const CORS_EXPOSED_HEADERS = "";
		const CORS_MAX_AGE = "";
		const HTTPS_PFX_FILE_PATH =
			"./test_resources/test_ssl_cert/server.cert"; // I know it's not an actual PFX file
		const HTTPS_PFX_PASSPHRASE = faker.lorem.word();
		const HTTPS_HTTP2_ENABLED = true;
		const LOG_LEVEL = faker.random.arrayElement([
			"debug",
			"warn",
			"silent",
		]);

		Object.assign(process.env, {
			SERVICE_HOST,
			SERVICE_PORT,
			SERVICE_REDIRECT_URL,
			CORS_ORIGIN,
			CORS_ALLOWED_HEADERS,
			CORS_ALLOW_CREDENTIALS,
			CORS_EXPOSED_HEADERS,
			CORS_MAX_AGE,
			HTTPS_PFX_FILE_PATH,
			HTTPS_PFX_PASSPHRASE,
			HTTPS_HTTP2_ENABLED,
			LOG_LEVEL,
		});

		const config = await getConfig();

		expect(config.fastify).toEqual({
			host: SERVICE_HOST,
			port: SERVICE_PORT,
		});

		expect(config.fastifyInit.https).toEqual({
			allowHTTP1: true,
			passphrase: HTTPS_PFX_PASSPHRASE,
			pfx: expect.any(Buffer),
		});
		expect(config.fastifyInit.http2).toEqual(true);

		expect(config.cors).toEqual({
			credentials: CORS_ALLOW_CREDENTIALS,
			origin: CORS_ORIGIN,
		});
	});

	test("Should return values according to environment variables - HTTPS disabled and CORS set to string value", async () => {
		const SERVICE_HOST = faker.internet.ip();
		const SERVICE_PORT = faker.datatype.number();
		const SERVICE_REDIRECT_URL = "https://www.nhs.uk/?";
		const CORS_ORIGIN = "https://ydh.nhs.uk";
		const CORS_ALLOWED_HEADERS =
			"Accept, Authorization, Content-Type, Origin, X-Requested-With";
		const CORS_ALLOW_CREDENTIALS = true;
		const CORS_EXPOSED_HEADERS = "Location";
		const CORS_MAX_AGE = 60;
		const LOG_LEVEL = faker.random.arrayElement([
			"debug",
			"warn",
			"silent",
		]);

		Object.assign(process.env, {
			SERVICE_HOST,
			SERVICE_PORT,
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
			host: SERVICE_HOST,
			port: SERVICE_PORT,
		});

		expect(config.cors).toEqual({
			origin: CORS_ORIGIN,
			allowedHeaders: CORS_ALLOWED_HEADERS,
			credentials: CORS_ALLOW_CREDENTIALS,
			exposedHeaders: CORS_EXPOSED_HEADERS,
			maxAge: CORS_MAX_AGE,
		});
	});

	test("Should return values according to environment variables - HTTPS disabled and CORS set to comma-delimited string value", async () => {
		const SERVICE_HOST = faker.internet.ip();
		const SERVICE_PORT = faker.datatype.number();
		const SERVICE_REDIRECT_URL = "https://www.nhs.uk/?";
		const CORS_ORIGIN =
			"https://test1.ydh.nhs.uk, https://test2.ydh.nhs.uk";
		const CORS_ALLOWED_HEADERS =
			"Accept, Authorization, Content-Type, Origin, X-Requested-With";
		const CORS_ALLOW_CREDENTIALS = "";
		const CORS_EXPOSED_HEADERS = "Location";
		const CORS_MAX_AGE = "";
		const LOG_LEVEL = faker.random.arrayElement([
			"debug",
			"warn",
			"silent",
		]);

		Object.assign(process.env, {
			SERVICE_HOST,
			SERVICE_PORT,
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
			host: SERVICE_HOST,
			port: SERVICE_PORT,
		});

		expect(config.cors).toEqual({
			origin: expect.arrayContaining([
				"https://test1.ydh.nhs.uk",
				"https://test2.ydh.nhs.uk",
			]),
			allowedHeaders: CORS_ALLOWED_HEADERS,
			exposedHeaders: CORS_EXPOSED_HEADERS,
		});
	});

	test("Should throw error if invalid PFX file path", async () => {
		const SERVICE_HOST = faker.internet.ip();
		const SERVICE_PORT = faker.datatype.number();
		const SERVICE_REDIRECT_URL = "https://www.nhs.uk/?";
		const CORS_ORIGIN = true;
		const CORS_ALLOWED_HEADERS = "";
		const CORS_ALLOW_CREDENTIALS = "";
		const CORS_EXPOSED_HEADERS = "";
		const CORS_MAX_AGE = "";
		const HTTPS_PFX_FILE_PATH = "./test_resources/test_ssl_cert/error.pfx";
		const HTTPS_PFX_PASSPHRASE = faker.lorem.word();
		const LOG_LEVEL = faker.random.arrayElement([
			"debug",
			"warn",
			"silent",
		]);

		Object.assign(process.env, {
			SERVICE_HOST,
			SERVICE_PORT,
			SERVICE_REDIRECT_URL,
			CORS_ORIGIN,
			CORS_ALLOWED_HEADERS,
			CORS_ALLOW_CREDENTIALS,
			CORS_EXPOSED_HEADERS,
			CORS_MAX_AGE,
			HTTPS_PFX_FILE_PATH,
			HTTPS_PFX_PASSPHRASE,
			LOG_LEVEL,
		});

		await expect(getConfig()).rejects.toThrow();
	});

	test("Should throw error if invalid SSL cert file path", async () => {
		const SERVICE_HOST = faker.internet.ip();
		const SERVICE_PORT = faker.datatype.number();
		const SERVICE_REDIRECT_URL = "https://www.nhs.uk/?";
		const CORS_ORIGIN = true;
		const CORS_ALLOWED_HEADERS = "";
		const CORS_ALLOW_CREDENTIALS = "";
		const CORS_EXPOSED_HEADERS = "";
		const CORS_MAX_AGE = "";
		const HTTPS_SSL_CERT_PATH = "./test_resources/test_ssl_cert/error.cert";
		const HTTPS_SSL_KEY_PATH = "./test_resources/test_ssl_cert/error.key";
		const LOG_LEVEL = faker.random.arrayElement([
			"debug",
			"warn",
			"silent",
		]);

		Object.assign(process.env, {
			SERVICE_HOST,
			SERVICE_PORT,
			SERVICE_REDIRECT_URL,
			CORS_ORIGIN,
			CORS_ALLOWED_HEADERS,
			CORS_ALLOW_CREDENTIALS,
			CORS_EXPOSED_HEADERS,
			CORS_MAX_AGE,
			HTTPS_SSL_CERT_PATH,
			HTTPS_SSL_KEY_PATH,
			LOG_LEVEL,
		});

		await expect(getConfig()).rejects.toThrow();
	});
});

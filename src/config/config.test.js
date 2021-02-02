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
		const SERVICE_PORT = faker.random.number();
		const SERVICE_REDIRECT_URL =
			"https://pyrusapps.blackpear.com/esp/#!/launch?";
		const HTTPS_SSL_CERT_PATH =
			"./test_resources/test_ssl_cert/server.cert";
		const HTTPS_SSL_KEY_PATH = "./test_resources/test_ssl_cert/server.key";
		const CORS_ORIGIN = false;
		const LOG_LEVEL = faker.random.arrayElement([
			"debug",
			"warn",
			"silent",
		]);
		const LOG_ROTATION_FILENAME = "./test_resources/test_log";
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
			HTTPS_SSL_CERT_PATH,
			HTTPS_SSL_KEY_PATH,
			CORS_ORIGIN,
			LOG_LEVEL,
			LOG_ROTATION_FILENAME,
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

		expect(config.fastifyInit.https).toEqual({
			cert: expect.any(Buffer),
			key: expect.any(Buffer),
		});

		expect(config.cors).toEqual({
			origin: CORS_ORIGIN,
		});

		expect(config.redirectUrl).toEqual(SERVICE_REDIRECT_URL);

		expect(config.authKeys).toContain("testtoken");

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
		const SERVICE_PORT = faker.random.number();
		const SERVICE_REDIRECT_URL =
			"https://pyrusapps.blackpear.com/esp/#!/launch?";
		const HTTPS_PFX_FILE_PATH =
			"./test_resources/test_ssl_cert/server.cert"; // I know it's not an actual PFX file
		const HTTPS_PFX_PASSPHRASE = faker.lorem.word();
		const CORS_ORIGIN = true;
		const LOG_LEVEL = faker.random.arrayElement([
			"debug",
			"warn",
			"silent",
		]);

		Object.assign(process.env, {
			SERVICE_HOST,
			SERVICE_PORT,
			SERVICE_REDIRECT_URL,
			HTTPS_PFX_FILE_PATH,
			HTTPS_PFX_PASSPHRASE,
			CORS_ORIGIN,
			LOG_LEVEL,
		});

		const config = await getConfig();

		expect(config.fastify).toEqual({
			host: SERVICE_HOST,
			port: SERVICE_PORT,
		});

		expect(config.fastifyInit.https).toEqual({
			passphrase: HTTPS_PFX_PASSPHRASE,
			pfx: expect.any(Buffer),
		});

		expect(config.cors).toEqual({
			origin: CORS_ORIGIN,
		});
	});

	test("Should return values according to environment variables - HTTPS disabled and CORS set to value", async () => {
		const SERVICE_HOST = faker.internet.ip();
		const SERVICE_PORT = faker.random.number();
		const SERVICE_REDIRECT_URL =
			"https://pyrusapps.blackpear.com/esp/#!/launch?";
		const CORS_ORIGIN = "https://ydh.nhs.uk";
		const CORS_METHODS = "GET";
		const CORS_ALLOWED_HEADERS =
			"Accept, Authorization, Content-Type, Origin, X-Requested-With";
		const CORS_EXPOSED_HEADERS = "Location";
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
			CORS_METHODS,
			CORS_ALLOWED_HEADERS,
			CORS_EXPOSED_HEADERS,
			LOG_LEVEL,
		});

		const config = await getConfig();

		expect(config.fastify).toEqual({
			host: SERVICE_HOST,
			port: SERVICE_PORT,
		});

		expect(config.cors).toEqual({
			origin: CORS_ORIGIN,
			methods: CORS_METHODS,
			allowedHeaders: CORS_ALLOWED_HEADERS,
			exposedHeaders: CORS_EXPOSED_HEADERS,
		});
	});

	test("Should throw error if invalid PFX file path", async () => {
		const SERVICE_HOST = faker.internet.ip();
		const SERVICE_PORT = faker.random.number();
		const SERVICE_REDIRECT_URL =
			"https://pyrusapps.blackpear.com/esp/#!/launch?";
		const HTTPS_PFX_FILE_PATH = "./test_resources/test_ssl_cert/error.pfx";
		const HTTPS_PFX_PASSPHRASE = faker.lorem.word();
		const CORS_ORIGIN = true;
		const LOG_LEVEL = faker.random.arrayElement([
			"debug",
			"warn",
			"silent",
		]);

		Object.assign(process.env, {
			SERVICE_HOST,
			SERVICE_PORT,
			SERVICE_REDIRECT_URL,
			HTTPS_PFX_FILE_PATH,
			HTTPS_PFX_PASSPHRASE,
			CORS_ORIGIN,
			LOG_LEVEL,
		});

		await expect(getConfig()).rejects.toThrow();
	});

	test("Should throw error if invalid SSL cert file path", async () => {
		const SERVICE_HOST = faker.internet.ip();
		const SERVICE_PORT = faker.random.number();
		const SERVICE_REDIRECT_URL =
			"https://pyrusapps.blackpear.com/esp/#!/launch?";
		const HTTPS_SSL_CERT_PATH = "./test_resources/test_ssl_cert/error.cert";
		const HTTPS_SSL_KEY_PATH = "./test_resources/test_ssl_cert/error.key";
		const CORS_ORIGIN = true;
		const LOG_LEVEL = faker.random.arrayElement([
			"debug",
			"warn",
			"silent",
		]);

		Object.assign(process.env, {
			SERVICE_HOST,
			SERVICE_PORT,
			SERVICE_REDIRECT_URL,
			HTTPS_SSL_CERT_PATH,
			HTTPS_SSL_KEY_PATH,
			CORS_ORIGIN,
			LOG_LEVEL,
		});

		await expect(getConfig()).rejects.toThrow();
	});
});

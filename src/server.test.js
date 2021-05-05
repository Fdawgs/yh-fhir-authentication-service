/* eslint-disable no-console */
const Fastify = require("fastify");
const mockServer = require("../test_resources/mocks/mirth-connect-server.mock");
const startServer = require("./server");
const getConfig = require("./config");

describe("Server Deployment", () => {
	beforeAll(async () => {
		try {
			await mockServer.listen(3001);
			console.log(
				"Mock Mirth Connect server listening on http://127.0.0.1:3001"
			);
		} catch (err) {
			console.log("Error starting mock Mirth Connect server:", err);
			process.exit(1);
		}
	});

	afterAll(async () => {
		await mockServer.close();
	});

	describe("Server", () => {
		let server;
		let config;

		beforeAll(async () => {
			config = await getConfig();
			config.redirectUrl = "http://127.0.0.1:3001";
			config.authKeys = ["testtoken"];
		});

		beforeEach(async () => {
			server = Fastify();
			server.register(startServer, config);
			await server.ready();
		});

		afterEach(() => {
			server.close();
		});

		test("Should redirect request to 'redirectUrl' with valid bearer token in header", async () => {
			const response = await server.inject({
				method: "GET",
				url: "/STU3/Patient/5484125",
				headers: {
					Authorization: "Bearer testtoken",
				},
			});

			expect(response.headers).toEqual(
				expect.not.objectContaining({
					"access-control-allow-headers": expect.any(String),
					"access-control-allow-methods": expect.any(String),
					"access-control-expose-headers": expect.any(String),
					etag: expect.any(String),
					server: expect.any(String),
					location: expect.any(String),
					"last-modified": expect.any(String),
				})
			);

			expect(response.statusCode).toBe(200);
		});

		test("Should redirect request to 'redirectUrl' using search route and query string params", async () => {
			const response = await server.inject({
				method: "GET",
				url: "/STU3/Patient",
				headers: {
					Authorization: "Bearer testtoken",
				},
				query: {
					identifier: "5484126",
					birthdate: ["ge2021-01-01", "le2021-05-01"],
				},
			});

			expect(response.headers).toEqual(
				expect.not.objectContaining({
					"access-control-allow-headers": expect.any(String),
					"access-control-allow-methods": expect.any(String),
					"access-control-expose-headers": expect.any(String),
					etag: expect.any(String),
					server: expect.any(String),
					location: expect.any(String),
					"last-modified": expect.any(String),
				})
			);

			expect(response.statusCode).toBe(200);
		});

		test("Should return HTTP 401 error when invalid bearer token provided in header", async () => {
			const response = await server.inject({
				method: "GET",
				url: "/STU3/Patient/5484125",
				headers: {
					Authorization: "Bearer invalid",
				},
			});

			expect(response.statusCode).toBe(401);

			expect(JSON.parse(response.payload)).toEqual(
				expect.objectContaining({
					error: "invalid authorization header",
				})
			);
		});

		test("Should return HTTP status code 406 if content-type in `Accept` request header unsupported", async () => {
			const response = await server.inject({
				method: "GET",
				url: "/STU3/Patient/5484125",
				headers: {
					Accept: "application/javascript",
					Authorization: "Bearer testtoken",
				},
			});

			expect(response.statusCode).toEqual(406);
		});
	});

	describe("CORS", () => {
		test("Should set 'access-control-allow-origin' to reflect 'origin' in request header", async () => {
			const server = Fastify();
			const config = await getConfig();
			config.redirectUrl = "http://127.0.0.1:3001";
			config.cors.origin = true;

			server.register(startServer, config);
			await server.ready();

			const response = await server.inject({
				method: "GET",
				url: "/STU3/Patient/5484125",
				headers: {
					Authorization: "Bearer testtoken",
					Origin: "https://notreal.ydh.nhs.uk",
				},
			});

			expect(response.headers).toEqual(
				expect.objectContaining({
					"access-control-allow-origin": "https://notreal.ydh.nhs.uk",
				})
			);

			expect(response.statusCode).toBe(200);

			server.close();
		});

		test("Should set 'access-control-allow-origin' to '*' if 'origin' not in request header", async () => {
			const server = Fastify();
			const config = await getConfig();
			config.redirectUrl = "http://127.0.0.1:3001";
			config.cors.origin = true;

			server.register(startServer, config);
			await server.ready();

			const response = await server.inject({
				method: "GET",
				url: "/STU3/Patient/5484125",
				headers: {
					Authorization: "Bearer testtoken",
				},
			});

			expect(response.headers).toEqual(
				expect.objectContaining({
					"access-control-allow-origin": "*",
				})
			);

			expect(response.statusCode).toBe(200);

			server.close();
		});

		test("Should set 'access-control-allow-origin' to string in config", async () => {
			const server = Fastify();
			const config = await getConfig();
			config.redirectUrl = "http://127.0.0.1:3001";
			config.cors.origin = "https://notreal.ydh.nhs.uk";

			server.register(startServer, config);
			await server.ready();

			const response = await server.inject({
				method: "GET",
				url: "/STU3/Patient/5484125",
				headers: {
					Authorization: "Bearer testtoken",
				},
			});

			expect(response.headers).toEqual(
				expect.objectContaining({
					"access-control-allow-origin": "https://notreal.ydh.nhs.uk",
				})
			);

			expect(response.statusCode).toBe(200);

			server.close();
		});

		test("Should not set 'access-control-allow-origin' if cors not enabled in config", async () => {
			const server = Fastify();
			const config = await getConfig();
			config.redirectUrl = "http://127.0.0.1:3001";
			delete config.cors.origin;

			server.register(startServer, config);
			await server.ready();

			const response = await server.inject({
				method: "GET",
				url: "/STU3/Patient/5484125",
				headers: {
					Authorization: "Bearer testtoken",
				},
			});

			expect(response.headers).toEqual(
				expect.objectContaining({
					"access-control-allow-origin": "*",
				})
			);

			expect(response.statusCode).toBe(200);

			server.close();
		});
	});
});

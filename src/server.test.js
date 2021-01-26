/* eslint-disable no-console */
const Fastify = require("fastify");
const mockServer = require("../test_resources/mocks/mirth-connect-server.mock");
const startServer = require("./server");
const getConfig = require("./config");

describe("Server deployment", () => {
	let config;

	beforeAll(async () => {
		config = await getConfig();

		try {
			await mockServer.listen(3001);
			config.redirectUrl = "http://127.0.0.1:3001";
			config.authKeys = ["testtoken"];
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
	});
});

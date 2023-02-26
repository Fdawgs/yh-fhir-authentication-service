const accepts = require("@fastify/accepts");
const Fastify = require("fastify");
const sensible = require("@fastify/sensible");
const swagger = require("@fastify/swagger");
const route = require(".");
const getConfig = require("../../../config");
const sharedSchemas = require("../../../plugins/shared-schemas");

describe("OpenAPI route", () => {
	describe("GET requests", () => {
		let config;
		let server;

		beforeAll(async () => {
			Object.assign(process.env, {
				FORWARD_URL: "https://nhs.uk",
			});
			config = await getConfig();

			server = Fastify();
			await server
				.register(accepts)
				.register(sensible)
				.register(sharedSchemas)
				.register(swagger, config.swagger)
				.register(route, config)
				.ready();
		});

		afterAll(async () => {
			await server.close();
		});

		test("Should return OpenAPI specification", async () => {
			const response = await server.inject({
				method: "GET",
				url: "/",
				headers: {
					accept: "application/json",
				},
			});

			expect(JSON.parse(response.payload)).toHaveProperty("openapi");
			expect(response.headers).toMatchObject({
				"cache-control": "public, max-age=1800",
			});
			expect(response.statusCode).toBe(200);
		});

		test("Should return HTTP status code 406 if media type in `Accept` request header is unsupported", async () => {
			const response = await server.inject({
				method: "GET",
				url: "/",
				headers: {
					accept: "application/javascript",
				},
			});

			expect(JSON.parse(response.payload)).toEqual({
				error: "Not Acceptable",
				message: "Not Acceptable",
				statusCode: 406,
			});
			expect(response.statusCode).toBe(406);
		});
	});
});
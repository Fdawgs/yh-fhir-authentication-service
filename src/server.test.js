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

	describe("End-To-End - CORS Disabled", () => {
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

		afterEach(async () => {
			await server.close();
		});

		describe("/admin/healthcheck Route", () => {
			test("Should return `ok`", async () => {
				const response = await server.inject({
					method: "GET",
					url: "/admin/healthcheck",
					headers: {
						accept: "text/plain",
					},
				});

				expect(response.payload).toEqual("ok");
				expect(response.statusCode).toEqual(200);
			});

			test("Should return HTTP status code 406 if media type in `Accept` request header is unsupported", async () => {
				const response = await server.inject({
					method: "GET",
					url: "/admin/healthcheck",
					headers: {
						accept: "application/javascript",
					},
				});

				expect(response.statusCode).toEqual(406);
			});
		});

		describe("/redirect Route", () => {
			test("Should redirect request to 'redirectUrl' with valid bearer token in header", async () => {
				const response = await server.inject({
					method: "GET",
					url: "/STU3/Patient/5484125",
					headers: {
						accept: "application/fhir+json",
						authorization: "Bearer testtoken",
					},
				});

				expect(response.headers).toEqual(
					expect.objectContaining({
						"content-security-policy":
							"default-src 'self';base-uri 'self';img-src 'self' data:;object-src 'none';child-src 'self';frame-ancestors 'none';form-action 'self';upgrade-insecure-requests;block-all-mixed-content",
						"x-dns-prefetch-control": "off",
						"expect-ct": "max-age=0",
						"x-frame-options": "SAMEORIGIN",
						"strict-transport-security":
							"max-age=31536000; includeSubDomains",
						"x-download-options": "noopen",
						"x-content-type-options": "nosniff",
						"x-permitted-cross-domain-policies": "none",
						"referrer-policy": "no-referrer",
						"x-xss-protection": "0",
						"surrogate-control": "no-store",
						"cache-control": "no-store, max-age=0, must-revalidate",
						pragma: "no-cache",
						expires: "0",
						"permissions-policy": "interest-cohort=()",
						vary: "Origin",
						"x-ratelimit-limit": expect.any(Number),
						"x-ratelimit-remaining": expect.any(Number),
						"x-ratelimit-reset": expect.any(Number),
						"content-type": "application/fhir+json; charset=UTF-8",
						"content-length": expect.any(String),
						date: expect.any(String),
						connection: "keep-alive",
					})
				);
				expect(response.statusCode).toEqual(200);
			});

			test("Should redirect request to 'redirectUrl' using search route and query string params", async () => {
				const response = await server.inject({
					method: "GET",
					url: "/STU3/Patient",
					headers: {
						accept: "application/fhir+json",
						authorization: "Bearer testtoken",
					},
					query: {
						identifier: "5484126",
						birthdate: ["ge2021-01-01", "le2021-05-01"],
					},
				});

				expect(response.headers).toEqual(
					expect.objectContaining({
						"content-security-policy":
							"default-src 'self';base-uri 'self';img-src 'self' data:;object-src 'none';child-src 'self';frame-ancestors 'none';form-action 'self';upgrade-insecure-requests;block-all-mixed-content",
						"x-dns-prefetch-control": "off",
						"expect-ct": "max-age=0",
						"x-frame-options": "SAMEORIGIN",
						"strict-transport-security":
							"max-age=31536000; includeSubDomains",
						"x-download-options": "noopen",
						"x-content-type-options": "nosniff",
						"x-permitted-cross-domain-policies": "none",
						"referrer-policy": "no-referrer",
						"x-xss-protection": "0",
						"surrogate-control": "no-store",
						"cache-control": "no-store, max-age=0, must-revalidate",
						pragma: "no-cache",
						expires: "0",
						"permissions-policy": "interest-cohort=()",
						vary: "Origin",
						"x-ratelimit-limit": expect.any(Number),
						"x-ratelimit-remaining": expect.any(Number),
						"x-ratelimit-reset": expect.any(Number),
						"content-type": "application/fhir+json; charset=UTF-8",
						"content-length": expect.any(String),
						date: expect.any(String),
						connection: "keep-alive",
					})
				);
				expect(response.statusCode).toEqual(200);
			});

			test("Should return HTTP status code 401 if invalid bearer token provided in header", async () => {
				const response = await server.inject({
					method: "GET",
					url: "/STU3/Patient/5484125",
					headers: {
						accept: "application/fhir+json",
						authorization: "Bearer invalid",
					},
				});

				expect(response.statusCode).toEqual(401);
			});

			test("Should return HTTP status code 406 if content-type in `Accept` request header unsupported", async () => {
				const response = await server.inject({
					method: "GET",
					url: "/STU3/Patient/5484125",
					headers: {
						accept: "application/javascript",
						authorization: "Bearer testtoken",
					},
				});

				expect(response.statusCode).toEqual(406);
			});
		});
	});

	describe("End-To-End - CORS Enabled", () => {
		describe("/admin/healthcheck Route", () => {
			let server;
			let config;

			beforeAll(async () => {
				server = Fastify();
				config = await getConfig();
				config.redirectUrl = "http://127.0.0.1:3001";
				config.cors.origin = true;

				server.register(startServer, config);
				await server.ready();
			});

			afterAll(async () => {
				await server.close();
			});

			test("Should return `ok`", async () => {
				const response = await server.inject({
					method: "GET",
					url: "/admin/healthcheck",
					headers: {
						accept: "text/plain",
					},
				});

				expect(response.payload).toEqual("ok");
				expect(response.statusCode).toEqual(200);
			});

			test("Should return HTTP status code 406 if media type in `Accept` request header is unsupported", async () => {
				const response = await server.inject({
					method: "GET",
					url: "/admin/healthcheck",
					headers: {
						accept: "application/javascript",
					},
				});

				expect(response.statusCode).toEqual(406);
			});
		});

		describe("/redirect Route", () => {
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
						accept: "application/fhir+json",
						authorization: "Bearer testtoken",
						Origin: "https://notreal.ydh.nhs.uk",
					},
				});

				expect(response.headers).toEqual(
					expect.objectContaining({
						"access-control-allow-origin":
							"https://notreal.ydh.nhs.uk",
						"content-security-policy":
							"default-src 'self';base-uri 'self';img-src 'self' data:;object-src 'none';child-src 'self';frame-ancestors 'none';form-action 'self';upgrade-insecure-requests;block-all-mixed-content",
						"x-dns-prefetch-control": "off",
						"expect-ct": "max-age=0",
						"x-frame-options": "SAMEORIGIN",
						"strict-transport-security":
							"max-age=31536000; includeSubDomains",
						"x-download-options": "noopen",
						"x-content-type-options": "nosniff",
						"x-permitted-cross-domain-policies": "none",
						"referrer-policy": "no-referrer",
						"x-xss-protection": "0",
						"surrogate-control": "no-store",
						"cache-control": "no-store, max-age=0, must-revalidate",
						pragma: "no-cache",
						expires: "0",
						"permissions-policy": "interest-cohort=()",
						vary: "Origin",
						"x-ratelimit-limit": expect.any(Number),
						"x-ratelimit-remaining": expect.any(Number),
						"x-ratelimit-reset": expect.any(Number),
						"content-type": "application/fhir+json; charset=UTF-8",
						"content-length": expect.any(String),
						date: expect.any(String),
						connection: "keep-alive",
					})
				);
				expect(response.statusCode).toEqual(200);

				await server.close();
			});

			test("Should not set 'access-control-allow-origin' if configured to reflect 'origin' in request header, but 'origin' missing", async () => {
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
						accept: "application/fhir+json",
						authorization: "Bearer testtoken",
					},
				});

				expect(response.headers).toEqual(
					expect.objectContaining({
						"content-security-policy":
							"default-src 'self';base-uri 'self';img-src 'self' data:;object-src 'none';child-src 'self';frame-ancestors 'none';form-action 'self';upgrade-insecure-requests;block-all-mixed-content",
						"x-dns-prefetch-control": "off",
						"expect-ct": "max-age=0",
						"x-frame-options": "SAMEORIGIN",
						"strict-transport-security":
							"max-age=31536000; includeSubDomains",
						"x-download-options": "noopen",
						"x-content-type-options": "nosniff",
						"x-permitted-cross-domain-policies": "none",
						"referrer-policy": "no-referrer",
						"x-xss-protection": "0",
						"surrogate-control": "no-store",
						"cache-control": "no-store, max-age=0, must-revalidate",
						pragma: "no-cache",
						expires: "0",
						"permissions-policy": "interest-cohort=()",
						vary: "Origin",
						"x-ratelimit-limit": expect.any(Number),
						"x-ratelimit-remaining": expect.any(Number),
						"x-ratelimit-reset": expect.any(Number),
						"content-type": "application/fhir+json; charset=UTF-8",
						"content-length": expect.any(String),
						date: expect.any(String),
						connection: "keep-alive",
					})
				);
				expect(response.statusCode).toEqual(200);

				await server.close();
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
						accept: "application/fhir+json",
						authorization: "Bearer testtoken",
					},
				});

				expect(response.headers).toEqual(
					expect.objectContaining({
						"access-control-allow-origin":
							"https://notreal.ydh.nhs.uk",
						"content-security-policy":
							"default-src 'self';base-uri 'self';img-src 'self' data:;object-src 'none';child-src 'self';frame-ancestors 'none';form-action 'self';upgrade-insecure-requests;block-all-mixed-content",
						"x-dns-prefetch-control": "off",
						"expect-ct": "max-age=0",
						"x-frame-options": "SAMEORIGIN",
						"strict-transport-security":
							"max-age=31536000; includeSubDomains",
						"x-download-options": "noopen",
						"x-content-type-options": "nosniff",
						"x-permitted-cross-domain-policies": "none",
						"referrer-policy": "no-referrer",
						"x-xss-protection": "0",
						"surrogate-control": "no-store",
						"cache-control": "no-store, max-age=0, must-revalidate",
						pragma: "no-cache",
						expires: "0",
						"permissions-policy": "interest-cohort=()",
						vary: "Origin",
						"x-ratelimit-limit": expect.any(Number),
						"x-ratelimit-remaining": expect.any(Number),
						"x-ratelimit-reset": expect.any(Number),
						"content-type": "application/fhir+json; charset=UTF-8",
						"content-length": expect.any(String),
						date: expect.any(String),
						connection: "keep-alive",
					})
				);
				expect(response.statusCode).toEqual(200);

				await server.close();
			});
		});
	});
});

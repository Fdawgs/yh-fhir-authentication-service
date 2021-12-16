/* eslint-disable no-console */
/* eslint-disable security-node/detect-crlf */
const Fastify = require("fastify");
const createJWKSMock = require("mock-jwks").default;
const mockServer = require("../test_resources/mocks/mirth-connect-server.mock");
const startServer = require("./server");
const getConfig = require("./config");

// Expected response headers
const expResHeaders = {
	"cache-control": "no-store, max-age=0, must-revalidate",
	connection: "keep-alive",
	"content-length": expect.any(String),
	"content-security-policy": "default-src 'self';frame-ancestors 'none'",
	"content-type": "application/fhir+json; charset=UTF-8",
	date: expect.any(String),
	"expect-ct": "max-age=0",
	expires: "0",
	"keep-alive": "timeout=5",
	"permissions-policy": "interest-cohort=()",
	pragma: "no-cache",
	"referrer-policy": "no-referrer",
	"strict-transport-security": "max-age=31536000; includeSubDomains",
	"surrogate-control": "no-store",
	vary: "Origin",
	"x-content-type-options": "nosniff",
	"x-dns-prefetch-control": "off",
	"x-download-options": "noopen",
	"x-frame-options": "SAMEORIGIN",
	"x-permitted-cross-domain-policies": "none",
	"x-ratelimit-limit": expect.any(Number),
	"x-ratelimit-remaining": expect.any(Number),
	"x-ratelimit-reset": expect.any(Number),
};

const expResHeadersJson = {
	...expResHeaders,
	"content-type": expect.stringContaining("application/json"),
};
delete expResHeadersJson["keep-alive"];

const expResHeadersText = {
	...expResHeaders,
	"content-type": expect.stringContaining("text/plain"),
};
delete expResHeadersText["keep-alive"];

const expResHeaders4xxErrors = {
	...expResHeadersJson,
};
delete expResHeaders4xxErrors.vary;
delete expResHeaders4xxErrors["keep-alive"];

describe("Server Deployment", () => {
	let mockJwksServer;
	let token;

	beforeAll(async () => {
		Object.assign(process.env, {
			SERVICE_REDIRECT_URL: "http://127.0.0.1:3001",
		});

		mockJwksServer = createJWKSMock(
			"https://not-real-issuer.ydh.nhs.uk",
			"/auth/realms/SIDER/protocol/openid-connect/certs"
		);
		mockJwksServer.start();

		token = mockJwksServer.token({
			aud: "private",
			iss: "master",
		});

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
		await mockJwksServer.stop();
		await mockServer.close();
	});

	describe("CORS", () => {
		beforeAll(async () => {
			Object.assign(process.env, {
				AUTH_BEARER_TOKEN_ARRAY: "",
				JWKS_ENDPOINT: "",
			});
		});

		describe("End-To-End - CORS Disabled", () => {
			let server;
			let config;

			beforeAll(async () => {
				config = await getConfig();
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

					expect(response.payload).toBe("ok");
					expect(response.headers).toEqual(expResHeadersText);
					expect(response.statusCode).toBe(200);
				});

				test("Should return HTTP status code 406 if media type in `Accept` request header is unsupported", async () => {
					const response = await server.inject({
						method: "GET",
						url: "/admin/healthcheck",
						headers: {
							accept: "application/javascript",
						},
					});

					expect(JSON.parse(response.payload)).toEqual({
						error: "Not Acceptable",
						message: "Not Acceptable",
						statusCode: 406,
					});
					expect(response.headers).toEqual(expResHeadersJson);
					expect(response.statusCode).toBe(406);
				});
			});

			describe("/redirect Route", () => {
				test("Should redirect request to 'redirectUrl'", async () => {
					const response = await server.inject({
						method: "GET",
						url: "/STU3/Patient/5484125",
						headers: {
							accept: "application/fhir+json",
						},
					});

					expect(JSON.parse(response.payload)).toHaveProperty(
						"resourceType",
						"Patient"
					);
					expect(response.headers).toEqual(expResHeaders);
					expect(response.statusCode).toBe(200);
				});

				test("Should redirect request to 'redirectUrl' using search route and query string params", async () => {
					const response = await server.inject({
						method: "GET",
						url: "/STU3/Patient",
						headers: {
							accept: "application/fhir+json",
						},
						query: {
							identifier: "5484126",
							birthdate: ["ge2021-01-01", "le2021-05-01"],
						},
					});

					expect(JSON.parse(response.payload)).toHaveProperty(
						"resourceType",
						"Patient"
					);
					expect(response.headers).toEqual(expResHeaders);
					expect(response.statusCode).toBe(200);
				});

				test("Should return HTTP status code 406 if content-type in `Accept` request header unsupported", async () => {
					const response = await server.inject({
						method: "GET",
						url: "/STU3/Patient/5484125",
						headers: {
							accept: "application/javascript",
						},
					});

					expect(JSON.parse(response.payload)).toEqual({
						error: "Not Acceptable",
						message: "Not Acceptable",
						statusCode: 406,
					});
					expect(response.headers).toEqual(expResHeadersJson);
					expect(response.statusCode).toBe(406);
				});
			});

			describe("Undeclared Route", () => {
				test("Should return HTTP status code 404 if route not found", async () => {
					const response = await server.inject({
						method: "GET",
						url: "/invalid",
						headers: {
							accept: "application/fhir+json",
						},
					});

					expect(JSON.parse(response.payload)).toEqual({
						error: "Not Found",
						message: "Route GET:/invalid not found",
						statusCode: 404,
					});
					expect(response.headers).toEqual(expResHeaders4xxErrors);
					expect(response.statusCode).toBe(404);
				});
			});
		});

		describe("End-To-End - CORS Enabled", () => {
			beforeAll(async () => {
				Object.assign(process.env, {
					CORS_ORIGIN: true,
				});
			});

			describe("/admin/healthcheck Route", () => {
				let server;
				let config;

				beforeAll(async () => {
					config = await getConfig();

					server = Fastify();
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

					expect(response.payload).toBe("ok");
					expect(response.headers).toEqual(expResHeadersText);
					expect(response.statusCode).toBe(200);
				});

				test("Should return HTTP status code 406 if media type in `Accept` request header is unsupported", async () => {
					const response = await server.inject({
						method: "GET",
						url: "/admin/healthcheck",
						headers: {
							accept: "application/javascript",
						},
					});

					expect(JSON.parse(response.payload)).toEqual({
						error: "Not Acceptable",
						message: "Not Acceptable",
						statusCode: 406,
					});
					expect(response.headers).toEqual(expResHeadersJson);
					expect(response.statusCode).toBe(406);
				});
			});

			describe("/redirect Route", () => {
				test("Should set 'access-control-allow-origin' to reflect 'origin' in request header", async () => {
					const server = Fastify();
					const config = await getConfig();

					server.register(startServer, config);
					await server.ready();

					const response = await server.inject({
						method: "GET",
						url: "/STU3/Patient/5484125",
						headers: {
							accept: "application/fhir+json",
							Origin: "https://notreal.ydh.nhs.uk",
						},
					});

					expect(JSON.parse(response.payload)).toHaveProperty(
						"resourceType",
						"Patient"
					);
					expect(response.headers).toEqual({
						...expResHeaders,
						"access-control-allow-origin":
							"https://notreal.ydh.nhs.uk",
					});
					expect(response.statusCode).toBe(200);

					await server.close();
				});

				test("Should not set 'access-control-allow-origin' if configured to reflect 'origin' in request header, but 'origin' missing", async () => {
					const server = Fastify();
					const config = await getConfig();

					server.register(startServer, config);
					await server.ready();

					const response = await server.inject({
						method: "GET",
						url: "/STU3/Patient/5484125",
						headers: {
							accept: "application/fhir+json",
						},
					});

					expect(JSON.parse(response.payload)).toHaveProperty(
						"resourceType",
						"Patient"
					);
					expect(response.headers).toEqual(expResHeaders);
					expect(response.statusCode).toBe(200);

					await server.close();
				});

				test("Should set 'access-control-allow-origin' to string in config", async () => {
					const server = Fastify();
					const config = await getConfig();
					config.cors.origin = "https://notreal.ydh.nhs.uk";

					server.register(startServer, config);
					await server.ready();

					const response = await server.inject({
						method: "GET",
						url: "/STU3/Patient/5484125",
						headers: {
							accept: "application/fhir+json",
						},
					});

					expect(JSON.parse(response.payload)).toHaveProperty(
						"resourceType",
						"Patient"
					);
					expect(response.headers).toEqual({
						...expResHeaders,
						"access-control-allow-origin":
							"https://notreal.ydh.nhs.uk",
					});
					expect(response.statusCode).toBe(200);

					await server.close();
				});
			});
		});
	});

	describe("Auth", () => {
		beforeAll(async () => {
			Object.assign(process.env, {
				JWT_ALLOWED_AUDIENCE: "",
				JWT_ALLOWED_ALGO_ARRAY: "",
				JWT_ALLOWED_ISSUERS: "",
				JWT_MAX_AGE: "",
			});
		});

		const authTests = [
			{
				test_name:
					"End-To-End - Bearer Token Auth Enabled and JWKS JWT Auth Enabled",
				env_variables: {
					AUTH_BEARER_TOKEN_ARRAY:
						'[{"service": "test", "value": "testtoken"}]',
					JWKS_ENDPOINT:
						"https://not-real-issuer.ydh.nhs.uk/auth/realms/SIDER/protocol/openid-connect/certs",
				},
			},
			{
				test_name:
					"End-To-End - Bearer Token Auth Enabled and JWKS JWT Auth Disabled",
				env_variables: {
					AUTH_BEARER_TOKEN_ARRAY:
						'[{"service": "test", "value": "testtoken"}]',
					JWKS_ENDPOINT: "",
				},
			},
			{
				test_name:
					"End-To-End - Bearer Token Auth Disabled and JWKS JWT Auth Enabled",
				env_variables: {
					AUTH_BEARER_TOKEN_ARRAY: "",
					JWKS_ENDPOINT:
						"https://not-real-issuer.ydh.nhs.uk/auth/realms/SIDER/protocol/openid-connect/certs",
				},
			},
		];
		authTests.forEach((testObject) => {
			describe(`${testObject.test_name}`, () => {
				let server;
				let config;

				beforeAll(async () => {
					Object.assign(process.env, testObject.env_variables);
					config = await getConfig();
				});

				beforeEach(async () => {
					server = Fastify();
					server.register(startServer, config);
					await server.ready();
				});

				afterEach(async () => {
					await server.close();
				});

				describe("/redirect Route", () => {
					if (
						testObject?.env_variables?.AUTH_BEARER_TOKEN_ARRAY !==
						""
					) {
						test("Should redirect request to 'redirectUrl' using bearer token auth", async () => {
							const response = await server.inject({
								method: "GET",
								url: "/STU3/Patient/5484125",
								headers: {
									accept: "application/fhir+json",
									authorization: "Bearer testtoken",
								},
							});

							expect(JSON.parse(response.payload)).toHaveProperty(
								"resourceType",
								"Patient"
							);
							expect(response.headers).toEqual(expResHeaders);
							expect(response.statusCode).toBe(200);
						});
					}
					if (
						testObject?.env_variables?.AUTH_BEARER_TOKEN_ARRAY ===
						""
					) {
						test("Should fail to redirect request to 'redirectUrl' using bearer token auth", async () => {
							const response = await server.inject({
								method: "GET",
								url: "/STU3/Patient/5484125",
								headers: {
									accept: "application/fhir+json",
									authorization: "Bearer testtoken",
								},
							});

							expect(JSON.parse(response.payload)).toEqual({
								error: "Unauthorized",
								message: expect.any(String),
								statusCode: 401,
							});
							expect(response.headers).toEqual(expResHeadersJson);
							expect(response.statusCode).toBe(401);
						});
					}

					if (testObject?.env_variables?.JWKS_ENDPOINT !== "") {
						test("Should redirect request to 'redirectUrl' using JWKS JWT auth", async () => {
							const response = await server.inject({
								method: "GET",
								url: "/STU3/Patient/5484125",
								headers: {
									accept: "application/fhir+json",
									authorization: `Bearer ${token}`,
								},
							});

							expect(JSON.parse(response.payload)).toHaveProperty(
								"resourceType",
								"Patient"
							);
							expect(response.headers).toEqual(expResHeaders);
							expect(response.statusCode).toBe(200);
						});
					}

					if (testObject?.env_variables?.JWKS_ENDPOINT === "") {
						test("Should fail to redirect request to 'redirectUrl' using JWKS JWT auth", async () => {
							const response = await server.inject({
								method: "GET",
								url: "/STU3/Patient/5484125",
								headers: {
									accept: "application/fhir+json",
									authorization: `Bearer ${token}`,
								},
							});

							expect(JSON.parse(response.payload)).toEqual({
								error: "Unauthorized",
								message: expect.any(String),
								statusCode: 401,
							});
							expect(response.headers).toEqual(expResHeadersJson);
							expect(response.statusCode).toBe(401);
						});
					}
				});
			});
		});
	});
});

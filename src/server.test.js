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
	"content-length": expect.anything(),
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
	let mockJwksServerOne;
	let mockJwksServerTwo;
	let token;

	beforeAll(async () => {
		Object.assign(process.env, {
			SERVICE_REDIRECT_URL: "http://127.0.0.1:3001",
		});

		mockJwksServerOne = createJWKSMock(
			"https://not-real-issuer-valid.ydh.nhs.uk",
			"/certs"
		);
		mockJwksServerOne.start();

		mockJwksServerTwo = createJWKSMock(
			"https://not-real-issuer-invalid.ydh.nhs.uk",
			"/certs"
		);
		mockJwksServerTwo.start();

		token = mockJwksServerOne.token({
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
		await mockJwksServerOne.stop();
		await mockJwksServerTwo.stop();
		await mockServer.close();
	});

	describe("CORS", () => {
		let config;
		let server;
		let currentEnv;

		beforeAll(async () => {
			Object.assign(process.env, {
				AUTH_BEARER_TOKEN_ARRAY: "",
				JWKS_ENDPOINT: "",
			});
			currentEnv = { ...process.env };
		});

		afterEach(async () => {
			// Reset the process.env to default after each test
			jest.resetModules();
			Object.assign(process.env, currentEnv);

			await server.close();
		});

		const corsTests = [
			{
				testName: "CORS Disabled",
				envVariables: {
					CORS_ORIGIN: "",
				},
				request: {
					headers: {
						origin: null,
					},
				},
				expected: {
					response: {
						headers: {
							basic: expResHeaders,
							json: expResHeadersJson,
							text: expResHeadersText,
						},
					},
				},
			},
			{
				testName: "CORS Enabled",
				envVariables: {
					CORS_ORIGIN: true,
				},
				request: {
					headers: {
						origin: "https://notreal.ydh.nhs.uk",
					},
				},
				expected: {
					response: {
						headers: {
							basic: {
								...expResHeaders,
								"access-control-allow-origin":
									"https://notreal.ydh.nhs.uk",
							},
							json: {
								...expResHeadersJson,
								"access-control-allow-origin":
									"https://notreal.ydh.nhs.uk",
							},
							text: {
								...expResHeadersText,
								"access-control-allow-origin":
									"https://notreal.ydh.nhs.uk",
							},
						},
					},
				},
			},
			{
				testName: "Cors Enabled and Set to String",
				envVariables: {
					CORS_ORIGIN: "https://notreal.ydh.nhs.uk",
				},
				request: {
					headers: {
						origin: "https://notreal.ydh.nhs.uk",
					},
				},
				expected: {
					response: {
						headers: {
							basic: {
								...expResHeaders,
								"access-control-allow-origin":
									"https://notreal.ydh.nhs.uk",
							},
							json: {
								...expResHeadersJson,
								"access-control-allow-origin":
									"https://notreal.ydh.nhs.uk",
							},
							text: {
								...expResHeadersText,
								"access-control-allow-origin":
									"https://notreal.ydh.nhs.uk",
							},
						},
					},
				},
			},
		];
		corsTests.forEach((testObject) => {
			describe(`End-To-End - ${testObject.testName}`, () => {
				beforeAll(async () => {
					Object.assign(process.env, testObject.envVariables);
					config = await getConfig();
				});

				beforeEach(async () => {
					server = Fastify();
					server.register(startServer, config);
					await server.ready();
				});

				describe("/admin/healthcheck Route", () => {
					test("Should return `ok`", async () => {
						const response = await server.inject({
							method: "GET",
							url: "/admin/healthcheck",
							headers: {
								accept: "text/plain",
								origin: testObject.request.headers.origin,
							},
						});

						expect(response.payload).toBe("ok");
						expect(response.headers).toEqual(
							testObject.expected.response.headers.text
						);
						expect(response.statusCode).toBe(200);
					});

					test("Should return HTTP status code 406 if media type in `Accept` request header is unsupported", async () => {
						const response = await server.inject({
							method: "GET",
							url: "/admin/healthcheck",
							headers: {
								accept: "application/javascript",
								origin: testObject.request.headers.origin,
							},
						});

						expect(JSON.parse(response.payload)).toEqual({
							error: "Not Acceptable",
							message: "Not Acceptable",
							statusCode: 406,
						});
						expect(response.headers).toEqual(
							testObject.expected.response.headers.json
						);
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
								origin: testObject.request.headers.origin,
							},
						});

						expect(JSON.parse(response.payload)).toHaveProperty(
							"resourceType",
							"Patient"
						);
						expect(response.headers).toEqual(
							testObject.expected.response.headers.basic
						);
						expect(response.statusCode).toBe(200);
					});

					test("Should redirect request to 'redirectUrl' using search route and query string params", async () => {
						const response = await server.inject({
							method: "GET",
							url: "/STU3/Patient",
							headers: {
								accept: "application/fhir+json",
								origin: testObject.request.headers.origin,
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
						expect(response.headers).toEqual(
							testObject.expected.response.headers.basic
						);
						expect(response.statusCode).toBe(200);
					});

					// Only applicable to "CORS Enabled" test
					if (testObject.envVariables.CORS_ORIGIN === true) {
						test("Should not set 'access-control-allow-origin' if configured to reflect 'origin' in request header, but 'origin' missing", async () => {
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
					}

					test("Should return HTTP status code 406 if content-type in `Accept` request header unsupported", async () => {
						const response = await server.inject({
							method: "GET",
							url: "/STU3/Patient/5484125",
							headers: {
								accept: "application/javascript",
								origin: testObject.request.headers.origin,
							},
						});

						expect(JSON.parse(response.payload)).toEqual({
							error: "Not Acceptable",
							message: "Not Acceptable",
							statusCode: 406,
						});
						expect(response.headers).toEqual(
							testObject.expected.response.headers.json
						);
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
								origin: testObject.request.headers.origin,
							},
						});

						expect(JSON.parse(response.payload)).toEqual({
							error: "Not Found",
							message: "Route GET:/invalid not found",
							statusCode: 404,
						});
						expect(response.headers).toEqual(
							expResHeaders4xxErrors
						);
						expect(response.statusCode).toBe(404);
					});
				});
			});
		});
	});

	describe("Auth", () => {
		let config;
		let server;
		let currentEnv;

		beforeAll(async () => {
			Object.assign(process.env, {
				JWT_JWKS_ARRAY: "",
			});
			currentEnv = { ...process.env };
		});

		afterEach(async () => {
			// Reset the process.env to default after each test
			jest.resetModules();
			Object.assign(process.env, currentEnv);

			await server.close();
		});

		const authTests = [
			{
				testName: "Bearer Token Auth Enabled and JWKS JWT Auth Enabled",
				envVariables: {
					AUTH_BEARER_TOKEN_ARRAY:
						'[{"service": "test", "value": "testtoken"}]',
					JWT_JWKS_ARRAY:
						'[{"jwksEndpoint": "https://not-real-issuer-valid.ydh.nhs.uk/certs"}]',
				},
			},
			{
				testName:
					"Bearer Token Auth Enabled and JWKS JWT Auth Disabled",
				envVariables: {
					AUTH_BEARER_TOKEN_ARRAY:
						'[{"service": "test", "value": "testtoken"}]',
					JWT_JWKS_ARRAY: "",
				},
			},
			{
				testName:
					"Bearer Token Auth Disabled and JWKS JWT Auth Enabled With One JWKS Endpoint",
				envVariables: {
					AUTH_BEARER_TOKEN_ARRAY: "",
					JWT_JWKS_ARRAY:
						'[{"jwksEndpoint": "https://not-real-issuer-valid.ydh.nhs.uk/certs"}]',
				},
			},
			{
				testName:
					"Bearer Token Auth Disabled and Jwks Jwt Auth Enabled With Two Jwks Endpoints (With Valid Key for One)",
				envVariables: {
					AUTH_BEARER_TOKEN_ARRAY: "",
					JWT_JWKS_ARRAY:
						'[{"jwksEndpoint": "https://not-real-issuer-valid.ydh.nhs.uk/certs"},{"jwksEndpoint": "https://not-real-issuer-invalid.ydh.nhs.uk/certs"}]',
				},
			},

			{
				testName:
					"Bearer Token Auth Disabled and Jwks Jwt Auth Enabled With One Jwks Endpoint (With an Invalid Key)",
				envVariables: {
					AUTH_BEARER_TOKEN_ARRAY: "",
					JWT_JWKS_ARRAY:
						'[{"jwksEndpoint": "https://not-real-issuer-invalid.ydh.nhs.uk/certs"}]',
				},
			},
		];
		authTests.forEach((testObject) => {
			describe(`End-To-End - ${testObject.testName}`, () => {
				beforeAll(async () => {
					Object.assign(process.env, testObject.envVariables);
					config = await getConfig();
				});

				beforeEach(async () => {
					server = Fastify();
					server.register(startServer, config);
					await server.ready();
				});

				describe("/redirect Route", () => {
					if (
						testObject?.envVariables?.AUTH_BEARER_TOKEN_ARRAY !== ""
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
						testObject?.envVariables?.AUTH_BEARER_TOKEN_ARRAY === ""
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

					if (
						testObject?.envVariables?.JWT_JWKS_ARRAY !== "" &&
						testObject?.envVariables?.JWT_JWKS_ARRAY !==
							'[{"jwksEndpoint": "https://not-real-issuer-invalid.ydh.nhs.uk/certs"}]'
					) {
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

					if (
						testObject?.envVariables?.JWT_JWKS_ARRAY === "" ||
						testObject?.envVariables?.JWT_JWKS_ARRAY ===
							'[{"jwksEndpoint": "https://not-real-issuer-invalid.ydh.nhs.uk/certs"}]'
					) {
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
								message: "invalid authorization header",
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

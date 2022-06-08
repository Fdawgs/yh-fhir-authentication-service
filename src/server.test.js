const Fastify = require("fastify");
const createJWKSMock = require("mock-jwks").default;
const nock = require("nock");
const { readPatient, searchPatient } = require("../test_resources/constants");
const startServer = require("./server");
const getConfig = require("./config");

// Expected response headers
const expResHeaders = {
	"cache-control": "no-store, max-age=0, must-revalidate",
	connection: "keep-alive",
	"content-length": expect.stringMatching(/\d+/),
	"content-security-policy": "default-src 'self';frame-ancestors 'none'",
	"content-type": "application/fhir+json; charset=UTF-8",
	date: expect.any(String),
	"expect-ct": "max-age=0",
	expires: "0",
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

const expResHeadersText = {
	...expResHeaders,
	"content-type": expect.stringContaining("text/plain"),
};

const expResHeaders4xxErrors = {
	...expResHeadersJson,
};
delete expResHeaders4xxErrors.vary;

describe("Server Deployment", () => {
	const invalidIssuerUri = "https://invalid-issuer.ydh.nhs.uk";
	const validIssuerUri = "https://valid-issuer.ydh.nhs.uk";
	let mockJwksServerOne;
	let mockJwksServerTwo;
	let token;

	beforeAll(async () => {
		Object.assign(process.env, {
			SERVICE_REDIRECT_URL: "http://unsecured-server.ydh.nhs.uk",
		});

		nock.disableNetConnect();

		// Create an issuer that we have a valid JWT for
		nock(validIssuerUri)
			.get("/.well-known/openid-configuration")
			.reply(200, {
				jwks_uri: "https://valid-issuer.sft.nhs.uk/jwks",
			})
			.persist();
		mockJwksServerOne = createJWKSMock(
			"https://valid-issuer.sft.nhs.uk",
			"/jwks"
		);
		mockJwksServerOne.start();

		token = mockJwksServerOne.token({
			aud: "private",
			iss: validIssuerUri,
		});

		// Create an issuer that we do not have a valid JWT for
		nock(invalidIssuerUri)
			.get("/.well-known/openid-configuration")
			.reply(200, {
				jwks_uri: "https://invalid-issuer.sft.nhs.uk/jwks",
			})
			.persist();
		mockJwksServerTwo = createJWKSMock(
			"https://invalid-issuer.sft.nhs.uk",
			"/jwks"
		);
		mockJwksServerTwo.start();

		// Create FHIR endpoints
		nock("http://unsecured-server.ydh.nhs.uk")
			.defaultReplyHeaders({
				"Access-Control-Allow-Methods":
					"GET, POST, PUT, DELETE, OPTIONS",
				"Access-Control-Allow-Origin": "*",
				"Access-Control-Expose-Headers": "Content-Location, Location",
				"Content-Type": "application/fhir+json; charset=UTF-8",
				ETag: 'W/"1"',
				"Last-Modified": "Tue, 10 Oct 2021 08:55:07 GMT",
				Server: "Mirth Connect FHIR Server (3.12.0.ydh001)",
			})
			.replyContentLength()
			.replyDate()
			.persist()
			// Read patient
			.get("/STU3/Patient/5484125")
			.reply(200, readPatient)
			// Search patient
			.persist()
			.get("/STU3/Patient")
			.query({
				identifier: "5484126",
				birthdate: ["ge2021-01-01", "le2021-05-01"],
			})
			.reply(200, searchPatient);
	});

	afterAll(async () => {
		nock.cleanAll();
		nock.enableNetConnect();
		await mockJwksServerOne.stop();
		await mockJwksServerTwo.stop();
	});

	describe("CORS", () => {
		let config;
		let server;
		let currentEnv;

		beforeAll(async () => {
			Object.assign(process.env, {
				AUTH_BEARER_TOKEN_ARRAY: "",
				JWT_JWKS_ARRAY: "",
			});
			currentEnv = { ...process.env };
		});

		afterEach(async () => {
			// Reset the process.env to default after each test
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
			{
				testName: "Cors Enabled and Set to Array of Strings",
				envVariables: {
					CORS_ORIGIN: [
						"https://notreal.ydh.nhs.uk",
						"https://notreal.sft.nhs.uk",
					],
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
				testName: "Cors Enabled and Set to Wildcard",
				envVariables: {
					CORS_ORIGIN: "*",
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
								"access-control-allow-origin": "*",
							},
							json: {
								...expResHeadersJson,
								"access-control-allow-origin": "*",
							},
							text: {
								...expResHeadersText,
								"access-control-allow-origin": "*",
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
					// Use Node's core HTTP client as Undici HTTP client throws when used with mocks
					delete config.redirect.undici;
					config.redirect.http = true;
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
					test("Should redirect request to 'SERVICE_REDIRECT_URL'", async () => {
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

					test("Should redirect request to 'SERVICE_REDIRECT_URL' using search route and query string params", async () => {
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
							"Bundle"
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
			Object.assign(process.env, currentEnv);

			await server.close();
		});

		const authTests = [
			{
				testName: "Bearer Token Auth Enabled and JWKS JWT Auth Enabled",
				envVariables: {
					AUTH_BEARER_TOKEN_ARRAY:
						'[{"service": "test", "value": "testtoken"}]',
					JWT_JWKS_ARRAY: `[{"issuerDomain": "${validIssuerUri}"}]`,
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
					JWT_JWKS_ARRAY: `[{"issuerDomain": "${validIssuerUri}"}]`,
				},
			},
			{
				testName:
					"Bearer Token Auth Disabled and JWKS JWT Auth Enabled With One JWKS Endpoint with different aud",
				envVariables: {
					AUTH_BEARER_TOKEN_ARRAY: "",
					JWT_JWKS_ARRAY: `[{"issuerDomain": "${validIssuerUri}", "allowedAudiences": "ydh"}]`,
				},
			},
			{
				testName:
					"Bearer Token Auth Disabled and Jwks Jwt Auth Enabled With Two Jwks Endpoints (With Valid Key for One)",
				envVariables: {
					AUTH_BEARER_TOKEN_ARRAY: "",
					JWT_JWKS_ARRAY: `[{"issuerDomain": "${validIssuerUri}"},{"issuerDomain": "${invalidIssuerUri}"}]`,
				},
			},

			{
				testName:
					"Bearer Token Auth Disabled and Jwks Jwt Auth Enabled With One Jwks Endpoint (With an Invalid Key)",
				envVariables: {
					AUTH_BEARER_TOKEN_ARRAY: "",
					JWT_JWKS_ARRAY: `[{"issuerDomain": "${invalidIssuerUri}"}]`,
				},
			},
		];
		authTests.forEach((testObject) => {
			describe(`End-To-End - ${testObject.testName}`, () => {
				beforeAll(async () => {
					Object.assign(process.env, testObject.envVariables);
					config = await getConfig();
					// Use Node's core HTTP client as Undici HTTP client throws when used with mocks
					delete config.redirect.undici;
					config.redirect.http = true;
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
						test("Should redirect request to 'SERVICE_REDIRECT_URL' using bearer token auth", async () => {
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

					test("Should fail to redirect request to 'SERVICE_REDIRECT_URL' using an invalid bearer token/JWT", async () => {
						const response = await server.inject({
							method: "GET",
							url: "/STU3/Patient/5484125",
							headers: {
								accept: "application/fhir+json",
								authorization: "Bearer invalidtoken",
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

					test("Should fail to redirect request to 'SERVICE_REDIRECT_URL' Resource if bearer token/JWT is missing", async () => {
						const response = await server.inject({
							method: "GET",
							url: "/STU3/Flag/126844-10",
							headers: {
								accept: "application/fhir+json",
							},
						});

						expect(JSON.parse(response.payload)).toEqual({
							error: "Unauthorized",
							message: "missing authorization header",
							statusCode: 401,
						});
						expect(response.headers).toEqual(expResHeadersJson);
						expect(response.statusCode).toBe(401);
					});

					if (
						testObject?.envVariables?.JWT_JWKS_ARRAY !== "" &&
						testObject?.envVariables?.JWT_JWKS_ARRAY !==
							`[{"issuerDomain": "${invalidIssuerUri}"}]` &&
						testObject?.envVariables?.JWT_JWKS_ARRAY !==
							`[{"issuerDomain": "${validIssuerUri}", "allowedAudiences": "ydh"}]`
					) {
						test("Should redirect request to 'SERVICE_REDIRECT_URL' using valid JWT against a valid Issuer", async () => {
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
							`[{"issuerDomain": "${invalidIssuerUri}"}]` ||
						testObject?.envVariables?.JWT_JWKS_ARRAY ===
							`[{"issuerDomain": "${validIssuerUri}", "allowedAudiences": "ydh"}]`
					) {
						test("Should fail to redirect request to 'SERVICE_REDIRECT_URL' using valid JWT against a invalid Issuer", async () => {
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

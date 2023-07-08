const S = require("fluent-json-schema").default;

const tags = ["Forwards"];

/**
 * Fastify uses AJV for JSON Schema Validation,
 * see https://fastify.io/docs/latest/Reference/Validation-and-Serialization/
 *
 * Input validation protects against XSS, HPP, prototype pollution,
 * and most other injection attacks
 */
const forwardGetSchema = {
	tags,
	produces: ["application/fhir+json", "application/fhir+xml"],
	params: S.object()
		.prop(
			"resource",
			S.string()
				.description(
					"FHIR STU3 resource name, see https://hl7.org/fhir/STU3/resourcelist.html"
				)
				// Longest FHIR STU3 resource name is "ImmunizationRecommendation" at 26 chars
				.pattern(/^[A-Za-z]{1,26}$/u)
		)
		.prop("id", S.string().pattern(/^[\w-]+$/u))
		.required(["resource"]),
	// FHIR STU3 search parameters, see https://hl7.org/fhir/STU3/search.html
	query: S.object()
		.patternProperties({
			"^[a-zA-Z-._:]+$": S.anyOf([
				S.string()
					.description("number")
					.pattern(/^(?:ap|eb|eq|ge|gt|le|lt|ne|sa)?[\d.]+$/u),
				S.string()
					.description("date")
					.pattern(
						// eslint-disable-next-line security/detect-unsafe-regex
						/^(?:ap|eb|eq|ge|gt|le|lt|ne|sa)?\d{4}-\d{2}-\d{2}(?:T\d{2}:\d{2}:\d{2})?$/u
					),
				S.string()
					.description("string")
					.pattern(/^[^"'<>]+$/u),
				S.string().description("uri").format("uri"),
				S.array()
					.items(
						S.anyOf([
							(S.string()
								.description("number")
								.pattern(
									/^(?:ap|eb|eq|ge|gt|le|lt|ne|sa)?[\d.]+$/u
								),
							S.string()
								.description("date")
								.pattern(
									// eslint-disable-next-line security/detect-unsafe-regex
									/^(?:ap|eb|eq|ge|gt|le|lt|ne|sa)?\d{4}-\d{2}-\d{2}(?:T\d{2}:\d{2}:\d{2})?$/u
								)),
							S.string()
								.description("string")
								.pattern(/^[^"'<>]+$/u),
						])
					)
					.minItems(2)
					.maxItems(2)
					.uniqueItems(true),
			]),
		})
		.additionalProperties(false),
	response: {
		200: S.object().additionalProperties(true),
		400: S.ref("responses#/properties/badRequest").description(
			"Bad Request"
		),
		406: S.ref("responses#/properties/notAcceptable").description(
			"Not Acceptable"
		),
		429: S.ref("responses#/properties/tooManyRequests").description(
			"Too Many Requests"
		),
		503: S.ref("responses#/properties/serviceUnavailable").description(
			"Service Unavailable"
		),
	},
};

module.exports = { forwardGetSchema };

const S = require("fluent-json-schema");

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
				.pattern(/^[a-zA-Z]{1,26}$/)
		)
		.prop("id", S.string().pattern(/^[\w-]+$/))
		.required(["resource"]),

	// FHIR STU3 search parameters, see https://hl7.org/fhir/STU3/search.html
	query: S.object()
		.patternProperties({
			"^[a-zA-Z-._:]+$": S.anyOf([
				S.string()
					.description("number")
					.pattern(/^(?:eq|ne|ge|le|gt|lt|sa|eb|ap|)[\d.]+$/),
				S.string()
					.description("date")
					.pattern(
						/^(?:eq|ne|ge|le|gt|lt|sa|eb|ap|)\d{4}-\d{2}-\d{2}(?:T\d{2}:\d{2}:\d{2}|)$/
					),
				S.string()
					.description("string")
					.pattern(/^[^<>"']+$/),
				S.string().description("uri").format("uri"),
				S.array()
					.items(
						S.anyOf([
							(S.string()
								.description("number")
								.pattern(
									/^(?:eq|ne|ge|le|gt|lt|sa|eb|ap|)[\d.]+$/
								),
							S.string()
								.description("date")
								.pattern(
									/^(?:eq|ne|ge|le|gt|lt|sa|eb|ap|)\d{4}-\d{2}-\d{2}(?:T\d{2}:\d{2}:\d{2}|)$/
								)),
							S.string()
								.description("string")
								.pattern(/^[^<>"']+$/),
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

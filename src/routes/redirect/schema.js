const S = require("fluent-json-schema");

const tags = ["Redirect"];

/**
 * Fastify uses AJV for JSON Schema Validation,
 * see https://www.fastify.io/docs/latest/Validation-and-Serialization/
 *
 * Input validation protects against XSS, HPP, and most injection attacks.
 */
const redirectGetSchema = {
	tags,
	summary: "Redirect route",
	description:
		"Redirects to the URL set with the `SERVICE_REDIRECT_URL` environment variable.",
	produces: ["application/fhir+json", "application/fhir+xml"],
	params: S.object()
		// Longest STU3 FHIR resource name is 'ImmunizationRecommendation' at 26 chars
		.prop("resource", S.string().pattern("^\\w{1,26}$"))
		.prop("id", S.string().pattern("^[\\w-]+$"))
		.required(["resource"]),

	// Querystring search parameters from https://www.hl7.org/fhir/STU3/search.html
	query: S.object()
		.patternProperties({
			"^[a-zA-Z\\-\\.\\_\\:]+$": S.anyOf([
				S.string()
					.description("number")
					.pattern("^(?:eq|ne|ge|le|gt|lt|sa|eb|ap|)[\\d\\.]+$"),
				S.string()
					.description("date")
					.pattern(
						"^(?:eq|ne|ge|le|gt|lt|sa|eb|ap|)\\d{4}-\\d{2}-\\d{2}(?:T\\d{2}:\\d{2}:\\d{2}|)$"
					),
				S.string().description("string").pattern("^[^<>\"']+$"),
				S.string().description("uri").format("uri"),
				S.array()
					.items(
						S.anyOf([
							(S.string()
								.description("number")
								.pattern(
									"^(?:eq|ne|ge|le|gt|lt|sa|eb|ap|)[\\d\\.]+$"
								),
							S.string()
								.description("date")
								.pattern(
									"^(?:eq|ne|ge|le|gt|lt|sa|eb|ap|)\\d{4}-\\d{2}-\\d{2}(?:T\\d{2}:\\d{2}:\\d{2}|)$"
								)),
							S.string()
								.description("string")
								.pattern("^[^<>\"']+$"),
						])
					)
					.minItems(2)
					.maxItems(2)
					.uniqueItems(true),
			]),
		})
		.additionalProperties(false),
	response: {
		401: S.ref("responses#/definitions/unauthorized").description(
			"Unauthorized"
		),
		406: S.ref("responses#/definitions/notAcceptable").description(
			"Not Acceptable"
		),
		429: S.ref("responses#/definitions/tooManyRequests").description(
			"Too Many Requests"
		),
		503: S.ref("responses#/definitions/serviceUnavailable").description(
			"Service Unavailable"
		),
	},
};

module.exports = { redirectGetSchema };

const Fastify = require("fastify");

const mockServer = Fastify();

const redirectGetSchema = require("../../src/routes/redirect/schema");

// Mock FHIR listener channel
mockServer.route({
	method: "GET",
	url: "/STU3/Patient/5484125",

	handler: (req, res) => {
		res.headers({
			"Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Expose-Headers": "Content-Location, Location",
			"Content-Type": "application/fhir+json; charset=UTF-8",
			Date: new Date().toUTCString(),
			ETag: 'W/"1"',
			"Last-Modified": "Tue, 10 Oct 2021 08:55:07 GMT",
			Location: "http://localhost:444/STU3/Patient/5484125/_history/1",
			Server: "Mirth Connect FHIR Server (3.12.0.ydh001)",
		});

		// Test patient
		res.send({
			resourceType: "Patient",
			id: "5484125",
			meta: {
				versionId: "1",
				lastUpdated: "2021-10-05T08:55:07+00:00",
				profile: [
					"https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-Patient-1",
				],
			},
			language: "English (Great Britain)",
			text: {
				status: "generated",
				div: '<div xmlns="http://www.w3.org/1999/xhtml"><div class="hapiHeaderText">Miss Charlotte <b>ZZZTEST </b></div><table class="hapiPropertyTable"><tbody><tr><td>Identifier</td><td>5484125</td></tr><tr><td>Address</td><td><span>The Venue, Unit 3 </span><br/><span>4 Artillery Road &quot; </span><br/><span>Yeovil </span></td></tr><tr><td>Date of birth</td><td><span>29 September 1954</span></td></tr></tbody></table></div>',
			},
			contained: [
				{
					resourceType: "Organization",
					id: "V81999",
					meta: {
						profile: [
							"https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-Organization-1",
						],
					},
					name: "0 GMP Unknown",
					address: [
						{
							use: "work",
							type: "both",
							line: ["Unknown GP"],
						},
					],
				},
			],
			extension: [
				{
					url: "https://fhir.hl7.org.uk/STU3/StructureDefinition/Extension-CareConnect-EthnicCategory-1",
					valueCodeableConcept: {
						coding: [
							{
								system: "https://fhir.hl7.org.uk/STU3/CodeSystem/CareConnect-EthnicCategory-1",
								code: "Z",
								display: "Not stated",
							},
							{
								system: "https://trakcare.ydh.nhs.uk",
								code: "Z",
								display: "Not stated",
							},
						],
					},
				},
				{
					url: "https://fhir.hl7.org.uk/STU3/StructureDefinition/Extension-CareConnect-ReligiousAffiliation-1",
					valueCodeableConcept: {
						coding: [
							{
								system: "https://datadictionary.nhs.uk",
								code: "N1",
								display: "Patient Religion Unknown",
							},
						],
					},
				},
			],
			identifier: [
				{
					use: "usual",
					system: "https://fhir.ydh.nhs.uk/Id/local-patient-identifier",
					value: "5484125",
				},
			],
			name: [
				{
					use: "usual",
					family: "Zzztest",
					given: ["Charlotte"],
					prefix: ["Miss"],
				},
			],
			telecom: [
				{
					system: "phone",
					value: "07588823822",
					use: "mobile",
				},
			],
			gender: "female",
			birthDate: "1954-09-29",
			deceasedBoolean: false,
			address: [
				{
					use: "home",
					type: "postal",
					line: ["The Venue, Unit 3", '4 Artillery Road "'],
					city: "Yeovil",
					district: "Somerset",
					postalCode: "BA22 8RP",
				},
			],
			maritalStatus: {
				coding: [
					{
						system: "https://hl7.org/fhir/stu3/v3/MaritalStatus",
						code: "U",
						display: "unknown",
					},
				],
			},
			contact: [
				{
					relationship: [
						{
							coding: [
								{
									system: "https://hl7.org/fhir/v2/0131",
									code: "N",
									display: "Next-of-kin",
								},
							],
						},
					],
					name: {
						use: "usual",
						text: "Zzztest Colin",
					},
					telecom: [
						{
							system: "phone",
							value: "00000",
						},
					],
				},
				{
					name: {
						use: "anonymous",
						text: "Switchboard",
					},
					telecom: [
						{
							system: "phone",
							value: "01935475122",
						},
					],
					organization: {
						reference:
							"https://directory.spineservices.nhs.uk/STU3/Organization/RA4",
						display:
							"YEOVIL DISTRICT HOSPITAL NHS FOUNDATION TRUST",
					},
				},
			],
			generalPractitioner: [
				{
					reference: "#V81999",
					display: "0 GMP Unknown",
				},
			],
		});
	},
});

mockServer.route({
	method: "GET",
	schema: redirectGetSchema,
	url: "/STU3/Patient",
	handler: (req, res) => {
		res.headers({
			"Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Expose-Headers": "Content-Location, Location",
			"Content-Type": "application/fhir+json; charset=UTF-8",
			Date: new Date().toUTCString(),
			ETag: 'W/"1"',
			"Last-Modified": "Tue, 10 Oct 2021 08:55:07 GMT",
			Location: `http://localhost:444/STU3/Patient/${req.identifier}/_history/1`,
			Server: "Mirth Connect FHIR Server (3.12.0.ydh001)",
		});

		// Test patient
		res.send({
			resourceType: "Patient",
			id: req.identifier,
			meta: {
				versionId: "1",
				lastUpdated: "2021-10-05T08:55:07+00:00",
				profile: [
					"https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-Patient-1",
				],
			},
			language: "English (Great Britain)",
			text: {
				status: "generated",
				div: '<div xmlns="http://www.w3.org/1999/xhtml"><div class="hapiHeaderText">Miss Charlotte <b>ZZZTEST </b></div><table class="hapiPropertyTable"><tbody><tr><td>Identifier</td><td>5484126</td></tr><tr><td>Address</td><td><span>The Venue, Unit 3 </span><br/><span>4 Artillery Road &quot; </span><br/><span>Yeovil </span></td></tr><tr><td>Date of birth</td><td><span>29 September 1954</span></td></tr></tbody></table></div>',
			},
		});
	},
});

module.exports = mockServer;

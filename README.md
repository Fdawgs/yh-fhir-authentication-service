<img alttext="Yeovil District Hospital Logo" src="https://yeovilhospital.co.uk/wp-content/uploads/2017/03/Yeovil_Hospital_Logo.jpg" width="480" />

# Yeovil District Hospital NHS Foundation Trust - FHIR API Authentication Service

[![GitHub Release](https://img.shields.io/github/release/Fdawgs/ydh-fhir-authentication-service.svg)](https://github.com/Fdawgs/ydh-fhir-authentication-service/releases/latest/) ![Build Status](https://github.com/Fdawgs/ydh-fhir-authentication-service/workflows/CI/badge.svg?branch=master) [![Coverage Status](https://coveralls.io/repos/github/Fdawgs/ydh-fhir-authentication-service/badge.svg?branch=master)](https://coveralls.io/github/Fdawgs/ydh-fhir-authentication-service?branch=master) [![Known Vulnerabilities](https://snyk.io/test/github/Fdawgs/ydh-fhir-authentication-service/badge.svg)](https://snyk.io/test/github/Fdawgs/ydh-fhir-authentication-service) [![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat)](https://github.com/prettier/prettier)

> Yeovil District Hospital NHSFT's FHIR API Authentication Service

## Intro

This is [Yeovil District Hospital NHSFT](https://yeovilhospital.co.uk/)'s FHIR API authentication service, a Node.js application using the [Fastify](https://www.fastify.io/) web framework.

Yeovil District Hospital NHSFT uses [Mirth Connect](https://github.com/nextgenhealthcare/connect) for its integration engines and, whilst a versatile system, does not provide the following:

-   SSL/TLS support out of the box
-   Easily configurable authentication on HTTP/FHIR listeners
-   Easily configurable CORS

This service was created to provide that functionality, acting as middleware between the firewall and the targeted FHIR/HTTP listener channel.

## Prerequisites

-   [Node.js](https://nodejs.org/en/)
-   [Mirth Connect](https://github.com/nextgenhealthcare/connect)

## Deployment

### Standard deployment

1. Navigate to the repo
2. Run `npm install --production` to install dependencies
3. Make a copy of `.env.template` in the root directory and rename to `.env`
4. Configure the application using the environment variables in `.env`
5. Run `npm start`

The service should now be up and running on the port set in the config. You should see the following output in stdout or the log file specified using the `LOG_ROTATION_FILENAME` environment variable:

```json
{
	"level": "info",
	"time": "2020-12-01T09:48:08.612Z",
	"pid": 41896,
	"hostname": "MYCOMPUTER",
	"msg": "Server listening at http://0.0.0.0:8204"
}
```

To quickly test it, use a request builder (i.e. [Insomnia](https://insomnia.rest/) or [Postman](https://www.postman.com/)) and import the example requests in `./test_resources/insomnia-test-requests.json`.

### Deploying using Docker

This requires [Docker](https://www.docker.com/products) installed.

1. Make a copy of `.env.template` in the root directory and rename to `.env`
2. Configure the application using the global variables in `.env`
3. Run `docker-compose up`

### Deploying using PM2

If you are unable to deploy this into production using Docker, it is recommended that you use a process manager such as [PM2](https://pm2.keymetrics.io/).

1. Navigate to the repo
2. Run `npm install --production` to install dependencies
3. Make a copy of `.env.template` in the root directory and rename to `.env`
4. Configure the application using the global variables in `.env`
5. Run `npm install -g pm2` to install pm2 globally
6. Launch application with `pm2 start .pm2.config.js`
7. Check the application has been deployed using `pm2 list` or `pm2 monit`

#### To install as a Windows service:

Yeovil District Hospital NHSFT is heavily entrenched in Microsoft's ecosystem; utilise [pm2-installer](https://github.com/jessety/pm2-installer) to easily install PM2 as a Windows service.

**Note:** PM2 has been configured to automatically restart the application if modifications are made to `.env`.

## Contributing

Please see [CONTRIBUTING.md](https://github.com/Fdawgs/ydh-fhir-authentication-service/blob/master/CONTRIBUTING.md) for more details regarding contributing to this project.

## Acknowledgements

-   [**Mark Hunt**](https://github.com/nhsbandit) - JWT and JWKS integration and testing
-   [**Will Jehring**](https://github.com/wjehring) - Redirect testing, and JWT testing

## License

`ydh-fhir-authentication-service` is licensed under the [MIT](https://github.com/Fdawgs/ydh-fhir-authentication-service/blob/master/LICENSE) license.

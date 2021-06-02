<img alttext="Yeovil District Hospital Logo" src="https://github.com/Fdawgs/ydh-logos/raw/HEAD/images/ydh-full-logo-transparent-background.svg" width="480" />

# Yeovil District Hospital NHS Foundation Trust - FHIR API Authentication Service

[![GitHub Release](https://img.shields.io/github/release/Fdawgs/ydh-fhir-authentication-service.svg)](https://github.com/Fdawgs/ydh-fhir-authentication-service/releases/latest/)
![Build Status](https://github.com/Fdawgs/ydh-fhir-authentication-service/workflows/CI/badge.svg?branch=master)
[![Coverage Status](https://coveralls.io/repos/github/Fdawgs/ydh-fhir-authentication-service/badge.svg?branch=master)](https://coveralls.io/github/Fdawgs/ydh-fhir-authentication-service?branch=master)
[![Known Vulnerabilities](https://snyk.io/test/github/Fdawgs/ydh-fhir-authentication-service/badge.svg)](https://snyk.io/test/github/Fdawgs/ydh-fhir-authentication-service)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat)](https://github.com/prettier/prettier)

> Yeovil District Hospital NHSFT's FHIR API Authentication Service

## Intro

This is [Yeovil District Hospital NHSFT](https://yeovilhospital.co.uk/)'s FHIR API authentication service, a Node.js application using the [Fastify](https://www.fastify.io/) web framework.

Yeovil District Hospital NHSFT uses [Mirth Connect](https://github.com/nextgenhealthcare/connect) for its integration engines that, whilst a versatile system, does not provide the following:

-   SSL/TLS support out of the box
-   Easily configurable authentication on HTTP/FHIR listeners
-   Easily configurable CORS

This service was created to provide that functionality, acting as middleware between the firewall and the targeted FHIR/HTTP listener channel.

## Prerequisites

-   [Node.js](https://nodejs.org/en/)
-   [Mirth Connect](https://github.com/nextgenhealthcare/connect)

## Setup

Perform the following steps before deployment:

1. Clone the repo
2. Navigate to the project directory
3. Run `npm install --ignore-scripts --production` to install dependencies
4. Make a copy of `.env.template` in the root directory and rename it to `.env`
5. Configure the application using the environment variables in `.env`

## Deployment

### Standard Deployment

1. Run `npm start`

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

### Deploying Using Docker

This requires [Docker](https://www.docker.com/products) installed.

1. Run `docker-compose up`

### Deploying Using PM2

If you are unable to deploy this into production using Docker, it is recommended that you use a process manager such as [PM2](https://pm2.keymetrics.io/).

1. Run `npm install -g pm2` to install pm2 globally
2. Launch application with `pm2 start .pm2.config.js`
3. Check the application has been deployed using `pm2 list` or `pm2 monit`

#### To Install as a Windows Service:

If using a Microsoft Windows OS utilise [pm2-installer](https://github.com/jessety/pm2-installer) to install PM2 as a Windows service.

**Note:** PM2 will automatically restart the application if `.env` is modified.

## Contributing

Contributions are welcome, and any help is greatly appreciated!

See [CONTRIBUTING.md](./CONTRIBUTING.md) for details on how to get started.
Please adhere to this project's [Code of Conduct](./CODE_OF_CONDUCT.md) when contributing.

## Acknowledgements

-   [**Mark Hunt**](https://github.com/nhsbandit) - JWT and JWKS integration and testing
-   [**Will Jehring**](https://github.com/wjehring) - Redirect testing, and JWT testing

## License

`ydh-fhir-authentication-service` is licensed under the [MIT](./LICENSE) license.

<a href="https://yeovilhospital.co.uk/">
	<img alttext="Yeovil District Hospital logo" src="https://github.com/Fdawgs/ydh-logos/raw/HEAD/images/ydh-full-logo-transparent-background.svg" width="480" />
</a>

# Yeovil District Hospital NHS Foundation Trust - FHIR API Authentication Service

[![GitHub Release](https://img.shields.io/github/release/Fdawgs/ydh-fhir-authentication-service.svg)](https://github.com/Fdawgs/ydh-fhir-authentication-service/releases/latest/)
![Build Status](https://github.com/Fdawgs/ydh-fhir-authentication-service/workflows/CI/badge.svg?branch=main)
[![Coverage Status](https://coveralls.io/repos/github/Fdawgs/ydh-fhir-authentication-service/badge.svg?branch=main)](https://coveralls.io/github/Fdawgs/ydh-fhir-authentication-service?branch=main)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat)](https://github.com/prettier/prettier)

> Yeovil District Hospital NHSFT's FHIR API authentication service

## Overview

This is [Yeovil District Hospital NHSFT](https://yeovilhospital.co.uk/)'s FHIR API authentication service, a Node.js application using the [Fastify](https://fastify.io/) web framework.

Yeovil District Hospital NHSFT uses [Mirth Connect](https://github.com/nextgenhealthcare/connect) for its integration engines that, whilst a versatile system, does not provide the following:

-   SSL/TLS support out of the box
-   Easily configurable authentication on HTTP/FHIR listeners
-   Easily configurable CORS

This service was created to provide that functionality, acting as a proxy and middleware between the firewall and the targeted FHIR/HTTP listener channel.

## Prerequisites

-   [Node.js](https://nodejs.org/en/) >=18.12.1 (if running outside of Docker)
-   [Mirth Connect](https://github.com/nextgenhealthcare/connect)

## Setup

Perform the following steps before deployment:

1. Download and extract the [latest release asset](https://github.com/Fdawgs/ydh-fhir-authentication-service/releases/latest)
2. Navigate to the extracted directory
3. Make a copy of `.env.template` in the root directory and rename it to `.env`
4. Configure the application using the environment variables in `.env`

> **Note**
> Set the following environment variables in `.env` to meet NHS England's recommendation to retain six months' worth of logs:
>
> -   `LOG_ROTATION_DATE_FORMAT="YYYY-MM-DD"`
> -   `LOG_ROTATION_FREQUENCY="daily"`
> -   `LOG_ROTATION_MAX_LOGS="180d"`

## Deployment

### Standard deployment

1. Run `npm ci --ignore-scripts --omit=dev` to install dependencies
2. Run `npm start`

The service should now be up and running on the port set in the config. Output similar to the following should appear in stdout or in the log file specified using the `LOG_ROTATION_FILENAME` environment variable:

```json
{
	"level": "info",
	"time": "2022-10-20T07:57:21.459Z",
	"pid": 148,
	"hostname": "MYCOMPUTER",
	"msg": "Server listening at http://127.0.0.1:51173"
}
```

To test it, use a request builder (i.e. [Insomnia](https://insomnia.rest/)) and import the example requests in `./test_resources/insomnia-test-requests.json`.

### Deploying using Docker

This requires [Docker](https://docker.com) installed.

1. Run `docker compose up` (or `docker compose up -d` to run in the background)

### Deploying using PM2

If this cannot be deployed into production using Docker, use a process manager such as [PM2](https://pm2.keymetrics.io/).

1. Run `npm ci --ignore-scripts --omit=dev` to install dependencies
2. Run `npm install -g pm2` to install pm2 globally
3. Launch application with `pm2 start .pm2.config.js`
4. Check the application has been deployed using `pm2 list` or `pm2 monit`

#### To install as a Windows service:

If using a Microsoft Windows OS utilise [pm2-installer](https://github.com/jessety/pm2-installer) to install PM2 as a Windows service.

> **Note**
> PM2 will automatically restart the application if `.env` is modified.

## Usage

### Accessing API documentation

API documentation can be found at `/docs`:

<img alttext="Screenshot of FHIR API Authentication Service documentation page" src="https://raw.githubusercontent.com/Fdawgs/ydh-fhir-authentication-service/main/docs/images/api_documentation_screenshot.png" width="720">

The underlying OpenAPI definitions are found at `/docs/openapi`.

## Contributing

Contributions are welcome, and any help is greatly appreciated!

See [the contributing guide](./CONTRIBUTING.md) for details on how to get started.
Please adhere to this project's [Code of Conduct](./CODE_OF_CONDUCT.md) when contributing.

## Acknowledgements

-   [**Mark Hunt**](https://github.com/nhsbandit) - JWT and JWKS integration and testing
-   [**Will Jehring**](https://github.com/wjehring) - Forwarding and JWT testing

## License

`ydh-fhir-authentication-service` is licensed under the [MIT](./LICENSE) license.

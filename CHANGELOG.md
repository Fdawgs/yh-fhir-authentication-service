# Changelog

All notable changes to this project will be documented in this file.

## [6.1.0](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/compare/v6.0.1...v6.1.0) (2021-09-06)


### Features

* **config:** add option to set `Access-Control-Max-Age` CORS header ([#290](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/issues/290)) ([ec4b7f7](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/ec4b7f7643b6507aee26a2ed50677c983b68bcca))


### Bug Fixes

* **config:** `SERVICE_REDIRECT_URL` env variable cannot be null ([71e105b](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/71e105b93889992ddb31f1d6d1bc7936f6b24b25))
* **server:** rate limit all 4xx and 5xx responses ([e803082](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/e8030823651a4c09ce3f9355d4ce19fe1068be61))


### Miscellaneous

* **.env.template:** clarify on HTTPS usage ([43afa33](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/43afa33154177ccbdd7530298cd48bf055161304))
* **.env.template:** clarify on required variables ([76df8d6](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/76df8d642ac3d2a1ba1b7e41aa0c9f4f8572b997))
* **.env.template:** remove log level value ([11d4942](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/11d4942b85a48896ad63a7b8daa5cc6412002afd))
* **.github:** use new YAML configured GitHub issue forms ([#292](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/issues/292)) ([90ab659](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/90ab659a3e44f5602e2f9319239f27c3825338fd))


### Continuous Integration

* **ci:** replace workflow-run-cleanup-action with github concurrency ([#293](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/issues/293)) ([13cfe4e](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/13cfe4ee291e901144f5ebcb12b0fb399d91d7df))


### Dependencies

* **deps:** bump fastify-disablecache from 2.0.2 to 2.0.3 ([798d46d](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/798d46dcf241981bcba9a86e6d02c07cf6f14855))
* **deps:** bump fastify-floc-off from 1.0.1 to 1.0.2 ([7286968](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/728696870f3c7f3a945a77664f9ab95b0bef935b))

### [6.0.1](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/compare/v6.0.0...v6.0.1) (2021-09-01)


### Bug Fixes

* **config:** bearer token security scheme format ([#282](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/issues/282)) ([2369280](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/236928005dfe71219fd2cc2609f97319fd4843e3))
* **plugins/jwt-jwks-auth:** stop attempting to rend second res ([cffb9c8](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/cffb9c879baf268b46c3913b261e2e8e39b60455))
* **routes:** rate-limiting not affecting 406 responses ([ff933f7](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/ff933f7a4104badda2404624ae8c581511644ecd))
* **server:** standardise 401 response schema ([9057497](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/90574979713c52a04464cdd67ef3fb7b925de2eb))


### Documentation

* **readme:** add note regarding log retention for nhs digital ([0a9ecf8](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/0a9ecf89100122835f365df952b26f211bfddb2e))


### Improvements

* add clearer summaries and descriptions for route schemas ([db9acd4](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/db9acd49bd9696c0c6b8de47f62cff9e969b2b82))
* **plugins/shared-schemas:** move response schemas to plugin ([9277822](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/9277822fedd579b7e3962c56ecf07f042bc32174))


### Miscellaneous

* **config:** remove excess word in inline comment ([444f99a](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/444f99a35f9d4bc8c4dd6bf6163e277e3083b9dd))


### Dependencies

* **deps-dev:** bump eslint-plugin-import from 2.24.0 to 2.24.2 ([4b673ec](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/4b673ec7d62261b0264e4e0ea3bf79561324adba))
* **deps-dev:** bump eslint-plugin-jsdoc from 36.0.7 to 36.0.8 ([e914b24](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/e914b24ffe92909166cfb0d57b11fa59695085a6))
* **deps-dev:** bump husky from 7.0.1 to 7.0.2 ([2b136d1](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/2b136d172eb8f5c6ee5282763a0200631ddd68b2))
* **deps-dev:** bump jest from 27.0.6 to 27.1.0 ([3a2d1de](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/3a2d1de04f0b9af010415c1f8cece6a989fd0ab5))
* **deps:** bump actions/github-script from 4.0.2 to 4.1 ([c144ebc](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/c144ebcc20b516a94ccc326a94e719767e452084))
* **deps:** bump fastify-autoload from 3.8.0 to 3.8.1 ([0fcc361](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/0fcc3618180d9b6d165d01bf3a8119e012b97347))
* **deps:** bump fastify-rate-limit from 5.6.0 to 5.6.2 ([c2b532d](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/c2b532ddcfcb5e96739529bb353a17998a08efa7))
* **deps:** bump pino from 6.13.0 to 6.13.1 ([fafc8d2](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/fafc8d2b87061e48373b95b7ad60e800e2c6df5b))
* **deps:** bump pino-pretty from 5.1.3 to 6.0.0 ([a147e12](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/a147e12f4d53b91d47510789d6c0af767fc84ae2))

## [6.0.0](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/compare/v5.0.0...v6.0.0) (2021-08-17)


### ⚠ BREAKING CHANGES

* **routes:** `/healthcheck` moved to `/admin/healthcheck`

### Features

* **routes/admin/healthcheck:** add cors header support ([c6ac6a5](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/c6ac6a57c8c841dd0789f0bb43e6411294ce0688))


### Bug Fixes

* **app:** logging grammar fixes ([88b2f73](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/88b2f73a780072c544047bf6234d0a3849a6880a))
* **config:** allow for empty logger env variables ([2698cf7](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/2698cf7fee2882a242b542ef54b1ce0348284770))
* **config:** defaults for undeclared variables ([76e04aa](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/76e04aa3fcc7d536f7f98c4bddb92da3d6cd860e))


### Miscellaneous

* **env:** document default logger values ([6a5a1a4](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/6a5a1a4eae497b11e35717eaba6922445a40bef8))
* **env:** standardise, sort, and group env variables ([41a2d75](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/41a2d75d484b1eee3a2c153f9db6fe318fe2e96d))


### Improvements

* **config:** consolidate logger pretty print conditional ([384049a](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/384049aad16f2298c202f56864d62df7d917bc84))
* replace `http-errors` with `fastify-sensible` plugin ([9890a07](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/9890a078ddef26900fdf2d4a9c8e5d45cfe5b5ea))
* **routes:** `/healthcheck` moved to `/admin/healthcheck` ([990428e](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/990428e0e8d91fe8858d90062b5bdbe5d9e0b847))


### Dependencies

* **deps-dev:** bump eslint-plugin-import from 2.23.4 to 2.24.0 ([24eb39d](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/24eb39d088dcea04aa391cdc6e6bcfe736c41bdc))
* **deps-dev:** bump eslint-plugin-jsdoc from 36.0.6 to 36.0.7 ([78d1da4](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/78d1da4d764f85f181e1038799ca44ab78d79c77))
* **deps:** bump actions/setup-node from 2.3.0 to 2.4.0 ([1b0b04f](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/1b0b04f0e0a15b2eef6af1183fb4c46348363957))
* **deps:** bump ajv-formats from 2.1.0 to 2.1.1 ([a4f360a](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/a4f360ab1de068a09dd882b94b213117d84b1e7b))
* **deps:** bump env-schema from 3.1.0 to 3.3.0 ([1971244](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/1971244e6bc5b75d6a5dc80fe8bccfd8db1120cf))
* **deps:** bump fastify from 3.19.2 to 3.20.2 ([3c0721c](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/3c0721cd4cc4a9f5382830f57cf6a665808c958a))
* **deps:** bump pino-pretty from 5.1.2 to 5.1.3 ([76942cc](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/76942cc34d0c357c010bd49a50e45e3b7ad6f85b))

## [5.0.0](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/compare/v4.0.3...v5.0.0) (2021-08-02)


### ⚠ BREAKING CHANGES

* minimum required version of node increased from 12 to 14 to allow for new ECMAScript syntax to be used

### Bug Fixes

* **docker-compose:** wrap variables in quotes ([#242](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/issues/242)) ([c83f3b9](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/c83f3b9ffc09899a1232e02e9194b3d4e29f4b6b))


### Improvements

* **config:** provide custom ajv instance to `env-schema` ([#240](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/issues/240)) ([c91c8cd](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/c91c8cd30cc18a6533ca4677ffcb238fcc4ae95d))


### Continuous Integration

* **ci:** remove redundant env variable ([2e3ec3e](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/2e3ec3e5a90df2e399c7988d0127f01e1a2d97e3))


### Dependencies

* **deps-dev:** bump eslint from 7.31.0 to 7.32.0 ([bfd632b](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/bfd632ba30e006f643f1d3e842ec0c9d4943732c))
* **deps-dev:** remove unused fastify-formbody dependency ([5686c2d](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/5686c2d746fbd98494d60162a80bfa90b573e013))
* **deps:** bump actions/setup-node from 2.2.0 to 2.3.0 ([c0c89ac](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/c0c89ac56eb12d2e717650ba4cf3519df3d2be32))
* **deps:** bump dependencies ([a28a4a4](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/a28a4a499d800909fd5829863b6f2dc1813978d1))
* **deps:** bump GoogleCloudPlatform/release-please-action ([ccd8935](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/ccd89350792e281554d555e4161fba3792456fb3))
* **docker:** bump curl from 7.67.0-r4 to 7.67.0-r5 ([34f0107](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/34f01078a9cb07af3179a9e99ec49ab89b6eb836))


### Miscellaneous

* grammar fixes for jsdoc tags ([#256](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/issues/256)) ([f3fef78](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/f3fef78854c027e3e3c9ece979c9fadf7cca9707))
* increase minimum required version of node from 12 to 14 ([#258](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/issues/258)) ([8a81193](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/8a81193fb816395c15665b04055cf236a5b46875))

### [4.0.3](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/compare/v4.0.2...v4.0.3) (2021-07-19)


### Bug Fixes

* **package:** move `pino-pretty` to production dependency list ([#230](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/issues/230)) ([3fb4011](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/3fb4011ab1ae05c4fb1ae4f8a1d3ec0cddb4acde))


### Improvements

* **routes/healthcheck:** move `Accept` header handling back to hook ([1dcd355](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/1dcd3554459915595cf275ee871c3fcb8600cc3a))
* **routes/redirect:** move `Accept` header handling back into hook ([55eded1](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/55eded19b5542ef9f6d0ca83c0f929c560a27815))
* **routes:** do not treat routes as plugins ([b883b1f](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/b883b1fd5e8866e88ad636cf0deafb445d98e14c))
* **server:** move redirect route and auth plugins into new context ([7e5a07e](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/7e5a07e123e23bf23637f396846e185264468d87))


### Continuous Integration

* **cd:** move perf optimizations and refactoring into same section ([97fe2ae](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/97fe2ae082816a5b346fb29d59092c7c4b266e45))


### Dependencies

* **deps-dev:** bump eslint from 7.30.0 to 7.31.0 ([59f0d3a](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/59f0d3a4877d01d3d388ebd6b519d34a14beefd2))
* **deps-dev:** bump eslint-plugin-jsdoc from 35.4.3 to 35.4.5 ([85463a1](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/85463a1679bcd6a5f3443a2a932b19eede8d61d3))
* **deps:** bump fastify from 3.19.0 to 3.19.1 ([92faeb6](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/92faeb6cd6feca3208e87501730cb3270375baa1))
* **deps:** bump fastify-cors from 6.0.1 to 6.0.2 ([ef16081](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/ef1608102db54e365cf72d1803a42c5d61a6b89b))
* **deps:** bump jwks-rsa from 2.0.3 to 2.0.4 ([cb2b03d](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/cb2b03df24ad54b51709f81de95d91c5bfeaf0c7))
* **deps:** bump wagoid/commitlint-github-action from 3.1.4 to 4.1.1 ([516aef2](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/516aef233af2d1222a305e744a23c94100e8b025))
* **dockerignore:** add dev files ([5203e92](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/5203e924a0d933e6612cbc6ddbe4f728db1d5ebc))
* **docker:** use native logging, healthcheck, restart and res handling ([ae00eb4](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/ae00eb4eddcaa36a0d48542a76f0d91c0d21f76e))


### Miscellaneous

* change mentions of "MIME type" to "media type" ([#225](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/issues/225)) ([adda5e9](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/adda5e9c17dbb188861907f1cd61a1f4a4368d72))
* **env.template:** use double quotes ([678dc45](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/678dc45e7195281947495f3487464d7dd2b7828d))
* **server:** sort plugin registering alphabetically ascending ([0551c8e](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/0551c8e8a24f06a438a73cc349b6a4f93175e25d))
* **server:** update encapsulation comment ([92ed426](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/92ed4263bd2d47df8abdf79b8992463b3cc69eb9))
* **test_resources:** fix name of test requests file ([aa3fffe](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/aa3fffe8af83ba7b55435632a288908a7c2b97ca))
* **test_resources:** update test requests with new headers ([873624a](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/873624a949765600bc4aa0b09827ee58fa5060f9))
* update jsdoc tag comments ([4e45184](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/4e451845c61c6acd237c93d56cd4207969bd15a9))
* update plugin metadata for server dependency graph ([288728c](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/288728c3f9bae19751994f6d32b4fd85e74db724))

### [4.0.2](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/compare/v4.0.1...v4.0.2) (2021-07-12)


### Bug Fixes

* **routes:** `Accept` header handling encapsulation ([#217](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/issues/217)) ([e0234d3](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/e0234d3abf44beab3df4040b08940b53b41dc2bf))


### Miscellaneous

* **vscode:** remove user space config setting ([b4c398c](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/b4c398c835ead58ae157f6dacd7e5b95886b6991))


### Dependencies

* **deps-dev:** bump eslint-plugin-jsdoc from 35.4.2 to 35.4.3 ([34d24f1](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/34d24f13ec86e5e6927bf07cf2faf4e54acf9486))
* **deps-dev:** bump nodemon from 2.0.10 to 2.0.12 ([fe8a2b7](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/fe8a2b73925c1402699f760f3ac609dc8a0b7a17))
* **deps:** bump fluent-json-schema from 3.0.0 to 3.0.1 ([bb86510](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/bb8651074890a5183465e9576563c266b8e19850))
* **deps:** bump pino from 6.11.3 to 6.12.0 ([7a39729](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/7a397298187187a9a9ab7186a80a82f754c9b80d))

### [4.0.1](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/compare/v4.0.0...v4.0.1) (2021-07-09)


### Bug Fixes

* **routes/healthcheck:** add `Accept` request header handling ([abe17d5](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/abe17d5d0c80103a777893179111498909dd3d5a))


### Miscellaneous

* **vscode:** disable redhat telemetry ([200c890](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/200c890a0609eb66cf28f60563db2629d219ca1a))


### Dependencies

* **deps-dev:** bump autocannon from 7.3.0 to 7.4.0 ([5166b77](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/5166b77f2692d5e4b7283ee42fe673b2f17bf9d0))
* **deps-dev:** bump coveralls from 3.1.0 to 3.1.1 ([21e5933](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/21e593387100a7f1b84dddfb4c77b6eb46f846b2))
* **deps-dev:** bump eslint from 7.29.0 to 7.30.0 ([c717314](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/c71731465961cd605ab9bb172c9b51f9e92a38a2))
* **deps-dev:** bump eslint-plugin-jsdoc from 35.4.0 to 35.4.1 ([49cb77b](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/49cb77bb2810a4ac946ed62a3468024f910d3b75))
* **deps-dev:** bump eslint-plugin-jsdoc from 35.4.1 to 35.4.2 ([975f8be](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/975f8be231593e1131e485c83c31aaad3058a8a2))
* **deps-dev:** bump husky from 6.0.0 to 7.0.0 ([0e76d7f](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/0e76d7ffab0b76bb91555a5f2cb4c07a8dbbfb5b))
* **deps-dev:** bump husky from 7.0.0 to 7.0.1 ([9603f47](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/9603f475a28bd40b8c001f82161bf923840da176))
* **deps-dev:** bump jest from 27.0.5 to 27.0.6 ([74c1327](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/74c1327f37e68aacc5f90de7cb977fa26c942fdd))
* **deps-dev:** bump nodemon from 2.0.7 to 2.0.9 ([69f076d](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/69f076dc2590eb14f152efbe7bfc95ff0d4f9888))
* **deps-dev:** bump nodemon from 2.0.9 to 2.0.10 ([234b68e](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/234b68edcd3a389fc263ff9ac9f1434fcaabbffa))
* **deps-dev:** bump pino-pretty from 5.0.2 to 5.1.0 ([49ce719](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/49ce71974c89ccddbfc7a224a0fec327e956b41e))
* **deps-dev:** bump pino-pretty from 5.1.0 to 5.1.1 ([f4f7f17](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/f4f7f17057b8f3f22c193adfd941a343f37e19ac))
* **deps-dev:** bump prettier from 2.3.1 to 2.3.2 ([846b0f7](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/846b0f7b5db473dc74a6f40053706f7b2a9592cb))
* **deps:** bump actions/setup-node from 2.1.5 to 2.2.0 ([eb5ae9a](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/eb5ae9ab6e36efe577436109449da38edfb4a98d))
* **deps:** bump coverallsapp/github-action from 1.1.2 to 1.1.3 ([14afe16](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/14afe16b30dc431b0dcbec0ac7548c22208ed1f3))
* **deps:** bump fastify from 3.18.0 to 3.18.1 ([119f704](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/119f704020bd40364f3d81321050a9fd1a84444e))
* **deps:** bump fastify from 3.18.1 to 3.19.0 ([afadc74](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/afadc740c835e6cc4114685a71bcb2e90955f49e))
* **deps:** bump fastify-helmet from 5.3.1 to 5.3.2 ([3ae6470](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/3ae6470f9910c454777eeb3f60df51d269b0074a))
* **deps:** bump fastify-reply-from from 5.3.0 to 6.0.1 ([13f6881](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/13f6881647ca9f8fc625c5ad59520e91f9f81140))

## [4.0.0](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/compare/v3.0.5...v4.0.0) (2021-06-22)


### ⚠ BREAKING CHANGES

* **routes/redirect:** Service no longer falls back to "*" wildcard for `access-control-allow-origin` if `CORS_ORIGIN` env variable is set to true to reflect request "Origin" but the request "Origin" header is missing. Now it will not set the header at all.
* **routes/redirect:** Service no longer falls back to Mirth Connect's `access-control-allow-origin` if `CORS_ORIGIN` env variable is not set.

### Bug Fixes

* **routes/redirect:** do not use "*" if req origin header missing ([c16624b](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/c16624b3fa9d961ad6b24dca3f5700afa05bcc9d))
* **routes/redirect:** do not use mirth's `access-control-allow-origin` ([49bce7f](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/49bce7fb61c23fe2309a17c3d377c892f2e5aeb4))
* **server:** increase `Strict-Transport-Security` max age to 365 days ([d2db435](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/d2db4359c3a0aa34d7e3172f939ff20d00463e6d))
* **server:** revert `Referrer-Policy` directives to "no-referrer" only ([c20312f](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/c20312f421a484e4b15ccc07065c36ce32aff418))
* **server:** use stricter `Content-Security-Policy` values ([93dd790](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/93dd790372889f201928b6985797c18ae27e2ca2))


### Continuous Integration

* **link-check:** reduce frequency from weekly to monthly ([#185](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/issues/185)) ([81959d0](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/81959d0d92340f7ea9ad6384c24fb23c73257d08))


### Miscellaneous

* **server:** clarify on what each registered plugin does ([54f950e](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/54f950eb4035b277dd08917594c1b4cd63573216))


### Dependencies

* **deps-dev:** bump eslint from 7.28.0 to 7.29.0 ([d453e40](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/d453e402f16d23ced0f60ecd7cceabc469520686))
* **deps-dev:** bump eslint-plugin-jsdoc from 35.3.0 to 35.4.0 ([d2ab988](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/d2ab9881304870846799c6eaf920512da0c6c5b4))
* **deps-dev:** bump jest from 27.0.4 to 27.0.5 ([0e62a01](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/0e62a01c225360302fc52b0a6cb5f9cf8ec31ace))
* **deps:** bump fastify-autoload from 3.7.1 to 3.8.0 ([8db9786](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/8db9786ae54006f9c51f7afb3419232be1308643))
* **deps:** bump fastify-bearer-auth from 5.1.0 to 6.0.0 ([a5f8b05](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/a5f8b0527f2aafa914b206c29a7622b918bae93d))
* **deps:** bump under-pressure from 5.6.0 to 5.7.0 ([f6c7c86](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/f6c7c86edefed23e86f93b502d77e161c733ab7c))

### [3.0.5](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/compare/v3.0.4...v3.0.5) (2021-06-17)


### Dependencies

* **deps:** bump actions/upload-artifact from 2.2.3 to 2.2.4 ([609de13](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/609de13488e68c1cb58997c3f4a3667b935bd6fe))
* **deps:** bump fastify from 3.17.0 to 3.18.0 ([56a6c51](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/56a6c5195f98a55d6681e46a7ff5d4d25c334995))
* **deps:** bump fastify-disablecache from 2.0.1 to 2.0.2 ([895b01c](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/895b01c6e60333d9d7a00521cf01b9ff89c0241f))

### [3.0.4](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/compare/v3.0.3...v3.0.4) (2021-06-16)


### Bug Fixes

* **config:** `isProduction` and `prettyPrint` conditionals ([#174](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/issues/174)) ([4d33632](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/4d3363275ec147c568cc90d09d7be4fa0ef3f7a1))


### Continuous Integration

* fix key usage in `action/setup-node` ([71b56bb](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/71b56bb09e10f87795b5fb4fc5ef1cc66cc0b0ee))


### Miscellaneous

* **ci:** replace `node-version` key with shorter `node` ([#155](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/issues/155)) ([bead259](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/bead259d82ca657ea22daaeec956725fb9cc3a67))
* **dockerfile:** consolidate consecutive `run` instructions ([#157](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/issues/157)) ([3b6404d](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/3b6404dcc22cf5469804d1145e0121056742f0eb))
* **env:** remove pre-filled process load env values in template ([#159](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/issues/159)) ([a7f4306](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/a7f430608765fdfc56c161f7a07d2054d7c9db8a))
* **workflows:** remove `stale.yml` ([1683d5a](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/1683d5af62a66359c4eec4eb0af2e2591e1b200e))


### Documentation

* **readme:** grammar and wordiness fixes ([01e5def](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/01e5defcfd4dafd8d839cc995a5104894d72e84a))


### Dependencies

* **deps-dev:** bump @commitlint/cli from 12.1.1 to 12.1.4 ([a341e1a](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/a341e1ad0f66cbbae0600d4c3de0d94912f53f4a))
* **deps-dev:** bump @commitlint/config-conventional ([c672c7e](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/c672c7ec6303e1dd81da78c29b7e9f30715965b8))
* **deps-dev:** bump eslint from 7.26.0 to 7.27.0 ([42db51e](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/42db51ed16deee214fbcc96f7635008ff606e68a))
* **deps-dev:** bump eslint from 7.27.0 to 7.28.0 ([5d7323b](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/5d7323baea05c2b85bac2b21abe4d29758fe658e))
* **deps-dev:** bump eslint-plugin-import from 2.22.1 to 2.23.4 ([21b28e5](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/21b28e55d35db21441638315ba2798e0a4cf6f9a))
* **deps-dev:** bump eslint-plugin-jsdoc from 34.0.1 to 35.1.2 ([4517246](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/451724649abfe350e008e48d907cf571515d5985))
* **deps-dev:** bump eslint-plugin-jsdoc from 35.1.2 to 35.3.0 ([df932d6](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/df932d60fa13a33cb5b51def5590e181723fb9aa))
* **deps-dev:** bump jest from 26.6.3 to 27.0.3 ([09f9e2d](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/09f9e2d6de972e3417e17c1f49280e466193c43c))
* **deps-dev:** bump jest from 27.0.3 to 27.0.4 ([c0f6e07](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/c0f6e07ab647bc2b6d9d8c16e4c7cb03ea3fba28))
* **deps-dev:** bump pino-pretty from 4.8.0 to 5.0.1 ([98e1afc](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/98e1afc7e54de57d2b668ffac84d7316e2f799c9))
* **deps-dev:** bump pino-pretty from 5.0.1 to 5.0.2 ([b2dd076](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/b2dd076846e24d119fd090169e980539d72692eb))
* **deps-dev:** bump prettier from 2.3.0 to 2.3.1 ([70f404a](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/70f404a070d2dbb08823818464aaf0680fd49ba8))
* **deps:** bump actions/cache from 2.1.5 to 2.1.6 ([97c5d2b](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/97c5d2b218c7a7aba233cb27cb5314f8602d7b0f))
* **deps:** bump dotenv from 9.0.2 to 10.0.0 ([5e5aeef](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/5e5aeefa369198ac962be508c9a32c0f119f0295))
* **deps:** bump fastify from 3.15.1 to 3.17.0 ([af96241](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/af96241fc73c9e9c14ad21be7091ba4c319203b0))
* **deps:** bump fastify-disablecache from 2.0.0 to 2.0.1 ([0646aa4](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/0646aa49cfc5b207e280cf2d5d997f05fe696374))
* **deps:** bump glob-parent from 5.1.1 to 5.1.2 ([013be4b](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/013be4b6a7b0259b58a1c4b44ac05c48c55afd33))
* **deps:** bump normalize-url from 4.5.0 to 4.5.1 ([c3503cc](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/c3503cc360bf2ed14ffda95907f2772496112506))
* **deps:** bump wagoid/commitlint-github-action from 3.1.3 to 3.1.4 ([0f5bc0e](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/0f5bc0ee7bd7fbc00177661f72a7a610451c15d7))
* **deps:** bump ws from 7.4.2 to 7.4.6 ([907b0fa](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/907b0faa6df421b5b5c00ff35de2d4c0e3d91f06))

### [3.0.3](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/compare/v3.0.2...v3.0.3) (2021-05-12)


### Bug Fixes

* **config:** `LOG_LEVEL` env variable validation ([1d129b5](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/1d129b5a6e0ae9a63a8764ac850090b0cb3a29f8))


### Continuous Integration

* **link-check:** run once a week on monday ([30df7bc](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/30df7bc0e450e340d3a1ba92de12377ab264767a))


### Dependencies

* **deps-dev:** bump autocannon from 7.2.0 to 7.3.0 ([49ee450](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/49ee450baaff005ae7caf570b9e314d8807d482c))
* **deps-dev:** bump eslint from 7.25.0 to 7.26.0 ([47b8034](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/47b80349413576c16e5a69debdd98f411a7ce6c0))
* **deps-dev:** bump eslint-plugin-jsdoc from 33.1.0 to 34.0.1 ([ad881cb](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/ad881cbc0954c20308c4efcfe30b18e4c403ee8b))
* **deps-dev:** bump glob from 7.1.6 to 7.1.7 ([8dd74df](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/8dd74df8ace2a92c1d924867e3be4c4da1480d95))
* **deps-dev:** bump pino-pretty from 4.7.1 to 4.8.0 ([3565997](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/3565997ce81b0a8f8f305c1dcaa92fba657188a2))
* **deps-dev:** bump prettier from 2.2.1 to 2.3.0 ([#153](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/issues/153)) ([4b0e08e](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/4b0e08e5b5145ade5766ea0639f9ad9ac23593b0))
* **deps:** bump brpaz/hadolint-action from 1.4.0 to 1.5.0 ([deafc5a](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/deafc5a576502b1981d6f7e593e80ee0c308b469))
* **deps:** bump dotenv from 8.5.1 to 9.0.2 ([9833661](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/9833661a48f68a1fa36469e2f78c002e76918988))
* **deps:** bump fastify-cors from 6.0.0 to 6.0.1 ([601b2e9](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/601b2e9172b25276485f20ca007ce380516fbed7))
* **deps:** bump fastify-floc-off from 1.0.0 to 1.0.1 ([0cb5da7](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/0cb5da768d38c18007740eb9033e8905cb2f50bc))
* **deps:** bump fluent-json-schema from 2.0.4 to 3.0.0 ([a442d82](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/a442d82473902f4dd12c4722a13c21c0a3429115))
* **deps:** bump GoogleCloudPlatform/release-please-action ([3522d93](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/3522d93f288bf421ee370b086094b22e170aef38))
* **deps:** bump wagoid/commitlint-github-action from 3.1.1 to 3.1.3 ([dc8fd31](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/dc8fd31f6919b159cf5277ab93c39944025737d0))

### [3.0.2](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/compare/v3.0.1...v3.0.2) (2021-05-05)


### Bug Fixes

* **routes/redirect:** schema support for duplicate query string params ([895adec](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/895adec4b8c269200e80bbb032bef3b1062d400d))


### Continuous Integration

* add nodejs v16 to test matrix ([6188e28](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/6188e284997308d86ed07d8b4b02faac1a13f108))


### Dependencies

* **deps-dev:** bump eslint-plugin-jsdoc from 33.0.0 to 33.1.0 ([50ab49d](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/50ab49dc0f8f843681113803ef87951d02aff531))
* **deps:** bump dotenv from 8.2.0 to 8.5.1 ([87b83a5](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/87b83a5d1f11a8cc742af58d01af77756cff7819))
* **deps:** bump wagoid/commitlint-github-action from v3.1.0 to v3.1.1 ([d7d8fc3](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/d7d8fc3e6f4e010047f7b5dc49085d06117e6d2a))

### [3.0.1](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/compare/v3.0.0...v3.0.1) (2021-05-04)


### Dependencies

* **deps:** bump fastify from 3.15.0 to 3.15.1 ([bbbe23b](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/bbbe23b0aa319f7057a259b0c78a86ade6a48c09))
* **deps:** bump fastify-reply-from from 5.2.0 to 5.3.0 ([d9ccbfe](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/d9ccbfe06b707c101bd0593c343d52a259bbb5ce))
* **deps:** bump GoogleCloudPlatform/release-please-action ([fa9ebf3](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/fa9ebf3505a3d7af240b3d32da4f1d151269e3eb))


### Documentation

* **readme:** compress duplicate setup steps into a single section ([#133](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/issues/133)) ([e1a1df5](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/e1a1df59e9b93091f28d17a4ae346d7b637a76c9))

## [3.0.0](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/compare/v2.0.0...v3.0.0) (2021-04-30)


### ⚠ BREAKING CHANGES

* remove support for nodejs v10, as it is EOL as of 2021-04-30

### Features

* **config:** allow for rate and process limits to be user configured ([733842f](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/733842f03ff35341b7e6798188a41315b5008555))
* **server:** add process-load/503 handling ([580f551](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/580f55117ae39b4dbcb093065d04d55cbd82591d))
* **server:** add rate limiter ([8561b05](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/8561b05b617a5c9b2207231e0027e26f12bc1b9c))
* **server:** disable google floc support ([abb06c2](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/abb06c26c4b219de61ded1dc8b13554981349b1e))


### Bug Fixes

* **config:** plugin defaults ([0e07cfc](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/0e07cfc22c8f59be525e800d781edb02e62ccf2e))
* **config:** re-add removed defaults ([916362d](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/916362d7972ee27d6bfca811a9415137f6bb7d7f))
* **routes:** hide options routes from swagger docs ([373c1e5](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/373c1e56e6402f39f803d9221b646525530acc64))


### Continuous Integration

* do not run coveralls steps/jobs on forks ([f20cb68](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/f20cb681d6a387b844cdce51c398f1b0492163f2))
* **link-check:** fix skip regex ([698b82a](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/698b82af028c5f4f88649c6a5aef36f06a19de9e))
* **typoci:** add "pino" to excluded words ([6d0070c](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/6d0070c05f23da67bb7677519d340c3984f6c2ed))


### Documentation

* grammar and readability fixes ([be22b12](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/be22b1256e2d21078b1d4a87ad899854c5242558))


### Dependencies

* **deps-dev:** bump autocannon from 7.0.5 to 7.2.0 ([f41d0d8](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/f41d0d816412bb4acf21b164462209310ed1ce6f))
* **deps-dev:** bump eslint from 7.23.0 to 7.25.0 ([ddd9023](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/ddd9023af525cca582845ddbbf5e90b22cedd0ad))
* **deps-dev:** bump eslint-config-prettier from 8.1.0 to 8.3.0 ([96491fd](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/96491fd0d6c8091963e986f3b3ed2fb3b74136d2))
* **deps-dev:** bump eslint-plugin-jest from 24.3.4 to 24.3.6 ([7764a9c](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/7764a9c94726a33acba54e77e7194d6e5e60d06e))
* **deps-dev:** bump eslint-plugin-jsdoc from 32.3.0 to 33.0.0 ([37c3464](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/37c34640033dd9f4a491476737fb942a2b59aa98))
* **deps-dev:** bump eslint-plugin-promise from 4.3.1 to 5.1.0 ([2398403](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/2398403cde32230494ea00ac5ebb785e66a03b53))
* **deps-dev:** bump faker from 5.5.2 to 5.5.3 ([fad0359](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/fad0359ac1d0d2409c9208ecc3a681c11ef9e3d0))
* **deps:** bump actions/cache from v2.1.4 to v2.1.5 ([776ef72](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/776ef728b5816d6e8c4f1b31894d44cc7afd8684))
* **deps:** bump actions/github-script from v3.1.1 to v4.0.2 ([c6cb4a9](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/c6cb4a93f85bef08414dc28437d735ef52219091))
* **deps:** bump actions/upload-artifact from v2.2.2 to v2.2.3 ([be78b3e](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/be78b3ed91fbe25bf140bef07f3b5b42ba768349))
* **deps:** bump brpaz/hadolint-action from v1.3.1 to v1.4.0 ([a506acc](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/a506accef9b039b45c6024c143ed6f6fadefae26))
* **deps:** bump fastify from 3.14.1 to 3.15.0 ([b0d544e](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/b0d544e7127bdbd495c3b6d8c418293b332d4779))
* **deps:** bump fastify-auth from 1.0.1 to 1.1.0 ([4acac11](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/4acac11b6a40629bcb6e705851cba12a0abc2132))
* **deps:** bump fastify-autoload from 3.6.0 to 3.7.1 ([f67c09c](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/f67c09c44d78f54c664bbc419c684e86182d7607))
* **deps:** bump fastify-cors from 5.2.0 to 6.0.0 ([1dea750](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/1dea750b33af217df806ebee1db48d15059d7ad5))
* **deps:** bump fastify-disablecache from 1.0.6 to 2.0.0 ([01e71bf](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/01e71bfb2c855c309abae5027e39409c3de0ad8f))
* **deps:** bump GoogleCloudPlatform/release-please-action ([daaeadb](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/daaeadb30c303ba59556c65a800a2a944fc25010))
* **deps:** bump jose from 2.0.4 to 2.0.5 ([dd6a30a](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/dd6a30ace21e0860b3f7457d6f67f6af1b549a43))
* **deps:** bump jwks-rsa from 2.0.2 to 2.0.3 ([6453cd2](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/6453cd2ce37290629cec5aef9d2c604d77c974e5))
* **deps:** bump pino from 6.11.2 to 6.11.3 ([382f089](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/382f08935ab9ee2e6f1e6e73fcd6b86358e3420e))
* **deps:** bump typoci/spellcheck-action from v0.4.0 to v1.1.0 ([561ff42](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/561ff4227c63275dc8510daa708ca7c1399a6dc7))


### Miscellaneous

* **config:** remove redundant conditionals ([a6df6ee](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/a6df6ee748be0381b7d0fd475717fb415f8d6cb1))
* **env:** add whitespace ([1faa835](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/1faa835e21832f58419c067c88709a538215a70e))
* remove support for nodejs v10 ([e312626](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/e312626e8e068ae75ee55151728963ee85a912e9))

## [2.0.0](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/compare/v1.1.0...v2.0.0) (2021-04-06)


### ⚠ BREAKING CHANGES

* `CORS_METHODS` env variable removed

### Features

* add support for cors preflight requests ([413be7d](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/413be7d880dfed91745046cbc1adee69515c36b1))
* **config:** support `access-control-allow-credentials` cors header ([7ce463c](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/7ce463c4d650be20482effacaf12b11f05ba29de))


### Bug Fixes

* **config:** comma-delimited string support for cors origin value ([d65b6e3](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/d65b6e395db6f22eedd2aedafbbf22b91b1765f9))


### Miscellaneous

* **env.template:** add note discouraging reflecting cors origin ([fe5f70b](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/fe5f70bf2ee0d74fa4fde1465018d1e443d76a68))
* **env.template:** remove bad example ([9073804](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/907380429e9e622d45770ea7afde0935103d7ac8))
* **tests:** standardise test file names ([60d9810](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/60d98105656a7be868183e010fb39f092f35b124))


### Documentation

* **readme:** grammar fix ([1d2a59e](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/1d2a59ea8b9708ce8c4f55991eabdb2050241d4b))


### Continuous Integration

* add cleanup-run job ([6f33a77](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/6f33a774fdc98709e78e9099758b592f7595caca))


### Dependencies

* **deps-dev:** bump @commitlint/cli from 12.0.1 to 12.1.1 ([cc6c618](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/cc6c6183b6b0a3a2518b0af06b59b0b66b384ff3))
* **deps-dev:** bump @commitlint/config-conventional ([d58a95f](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/d58a95fef0486a36cc06331d3557fc0e2a4004b3))
* **deps-dev:** bump eslint-plugin-jest from 24.3.2 to 24.3.4 ([5f226fc](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/5f226fc731ac938bdffeede9565682f3a0f976fb))
* **deps-dev:** bump faker from 5.5.1 to 5.5.2 ([1a05d75](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/1a05d75171c271f735dab729147bffd6874e33c7))
* **deps:** bump actions/github-script from v3.1.0 to v3.1.1 ([5e89427](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/5e89427c123e72fc5a4895a614a234c20a2489d5))
* **deps:** bump fastify-reply-from from 5.1.0 to 5.2.0 ([52542f6](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/52542f6eee6c8b6f70233f36ce9389400f7fa35a))
* **deps:** bump wagoid/commitlint-github-action from v3.0.6 to v3.1.0 ([45a915f](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/45a915f8d434778fb076a134bb57368c927acc04))

## [1.1.0](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/compare/v1.0.4...v1.1.0) (2021-03-30)


### Features

* **server:** use `strict-origin-when-cross-origin` referrer policy ([87e3a94](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/87e3a94045bc29186b7fa51a69d976b6fee9fd10))


### Continuous Integration

* **automerge:** move automerge job into new workflow ([ebe70c2](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/ebe70c29ebf4a2660e8b9144cb1c01a29c0f1736))
* **ci:** ignore dependabot prs for commit message linting ([79b46ec](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/79b46ec33d0442183447c98cd71216d45e3cb132))
* **stale:** shorten workflow name ([9129758](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/9129758b92ee98122bc738b1de12d46463805f40))
* **workflows:** run only on push and pulls to master branch ([77c36c2](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/77c36c24e390bf7a0935cb708ad3b628a4108a37))


### Dependencies

* **deps-dev:** bump autocannon from 7.0.4 to 7.0.5 ([2219177](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/2219177baf1b88a19a4a1803e2dd044cc8b48378))
* **deps-dev:** bump eslint from 7.21.0 to 7.23.0 ([538040d](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/538040d0481c1e4f371b4cc0753d7ccbda480d96))
* **deps-dev:** bump eslint-plugin-jest from 24.1.5 to 24.3.2 ([fcc9397](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/fcc9397de111dd7109b9c7c9db8bce7a715abda4))
* **deps-dev:** bump eslint-plugin-jsdoc from 32.2.0 to 32.3.0 ([7b5ff2a](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/7b5ff2a28e1a78b3b2eec7471baa88c36c271b24))
* **deps-dev:** bump faker from 5.4.0 to 5.5.1 ([a123d57](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/a123d5734b236c972e124f450d4123e9cc2b70d3))
* **deps-dev:** bump husky from 4.3.8 to 6.0.0 ([d2b385b](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/d2b385b08de5f9f8ad93ce6c687e93fecf1c0ef6))
* **deps-dev:** bump pino-pretty from 4.5.0 to 4.7.1 ([1422942](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/14229420e88ca495bf5d33f53a79c57964745f14))
* **deps:** bump actions/stale from v3.0.17 to v3.0.18 ([2dfe966](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/2dfe966be4d831477feaf1c77b2b21f6d941ed5a))
* **deps:** bump fastify from 3.12.0 to 3.14.1 ([56019f1](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/56019f1035434aece2b7c45c288f8fbfa55b272d))
* **deps:** bump fastify-autoload from 3.5.2 to 3.6.0 ([8d71004](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/8d7100463b02d26aff8c1ae84d8996bd4d04b4dd))
* **deps:** bump fastify-disablecache from 1.0.4 to 1.0.6 ([6498da3](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/6498da3e8b4e4ec0d67413479b13d67518371f22))
* **deps:** bump fastify-helmet from 5.2.0 to 5.3.1 ([db66248](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/db66248506967b657995e14c5aa0032f27fe0259))
* **deps:** bump fastify-reply-from from 5.0.1 to 5.1.0 ([8a11f0e](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/8a11f0eaf57983f3ef0dfe24485f44772b9330db))
* **deps:** bump GoogleCloudPlatform/release-please-action ([b3a417f](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/b3a417f9e2c4fdcee58a67fedf52944b69fe0931))
* **deps:** bump jwks-rsa from 1.12.3 to 2.0.2 ([8c8f1b1](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/8c8f1b199e53017c1defa13e94152d3fd8dc0463))
* **deps:** bump pino from 6.11.1 to 6.11.2 ([791f26d](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/791f26d7a876c258c5253565081a11d841d363fd))
* **deps:** bump typoci/spellcheck-action from v0.3.0 to v0.4.0 ([509832c](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/509832c1f19c7904b7100fc77587a0e59ec78f41))
* **deps:** bump wagoid/commitlint-github-action from v3.0.1 to v3.0.6 ([c27ae7f](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/c27ae7f767edc76fa9f174a2dbc570353f6bb947))
* **docker:** remove now optional `version` value ([056dd01](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/056dd0110cbc18b483b71fca34820962687b0d19))


### Miscellaneous

* **config:** move `pino-pretty` config out of script ([7d5c119](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/7d5c11945e5352aef048650a96789d52fbb7b0f0))
* **env.template:** add default cors settings ([da1fa28](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/da1fa28e593add6d9ce87778798bb9ca0d46546a))
* **prettierignore:** add yarn lock file ([647f2b7](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/647f2b7d4317d9a4ce1123a9f730f5cf2d412337))
* **readme:** replace jpg ydh logo with svg ([45849fc](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/45849fcbe2c8e55f516b9f329530d6a66455a6f9))
* remove contraction usage in comments ([5141d5b](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/5141d5b1db6facb068b74271a0f1c7fb3b235c45))
* **workflows:** rename ci and perf sections ([e3e360f](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/e3e360f0fc9c23de5399d1fa0c5b1415ba5d9fae))

### [1.0.4](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/compare/v1.0.3...v1.0.4) (2021-03-03)


### Documentation

* **readme:** fix broken link ([6f153a6](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/6f153a623dd714032568acfc4c68404dcac54af7))
* **readme:** shorten links ([557ade3](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/557ade3fdc9401804d6177f8d7445cefac0833e9))


### Dependencies

* **dependabot:** set commit message prefix; lower pull limit ([bed8472](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/bed84722c8273d90168d98e8ba9718031c7ae439))
* **deps-dev:** bump @commitlint/cli from 11.0.0 to 12.0.1 ([#51](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/issues/51)) ([400cc86](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/400cc865af5800f883ef1e4a83d6c3b1faddbbfb))
* **deps-dev:** bump @commitlint/config-conventional ([81ba8f0](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/81ba8f01a55372c6e2c6653e22411ca041bcf127))
* **deps-dev:** bump autocannon from 7.0.3 to 7.0.4 ([#49](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/issues/49)) ([d63ccf2](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/d63ccf2176e31ece0879f39be846a97a8929a010))
* **deps-dev:** bump eslint from 7.20.0 to 7.21.0 ([#52](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/issues/52)) ([3c9512b](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/3c9512b29206cd70107a61797d34b7a41c894859))
* **deps-dev:** bump eslint-config-prettier from 7.2.0 to 8.1.0 ([d8ea7bc](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/d8ea7bcd20b9478e5f7f12e5af5af27ee777d766))
* **deps-dev:** bump eslint-plugin-jest from 24.1.3 to 24.1.5 ([f68d360](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/f68d3601ffbeb9e5bd89aef0351f04c78cdfca4c))
* **deps-dev:** bump eslint-plugin-jsdoc from 32.0.1 to 32.2.0 ([#44](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/issues/44)) ([61c9f7d](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/61c9f7d97c5ac73f17c949b83f3cf96cf512c8f2))
* **deps-dev:** bump lodash from 4.17.20 to 4.17.21 ([#47](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/issues/47)) ([a586984](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/a5869846246e8bf252cc2148ee0d670ca8196710))
* **deps:** bump fastify-autoload from 3.4.2 to 3.5.2 ([#45](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/issues/45)) ([a4ddd8a](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/a4ddd8a255eebfccca552c272baf2815b08699cb))
* **deps:** bump fastify-reply-from from 4.0.0 to 5.0.1 ([#53](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/issues/53)) ([6772801](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/6772801bd51af469862a1a61a852dbe7d9e775a5))
* **deps:** bump fluent-json-schema from 2.0.3 to 2.0.4 ([#50](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/issues/50)) ([046b46e](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/046b46e897ac912a0bfb5cf82e787bcb72ef362a))
* **deps:** bump jwks-rsa from 1.12.2 to 1.12.3 ([#46](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/issues/46)) ([f2acbef](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/f2acbef9311b15458e5858f2f176654e4682edec))
* **deps:** bump wagoid/commitlint-github-action from v2.2.3 to v3.0.1 ([d91449b](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/d91449bb3cbaa33555abf1e7af1948e65636195c))
* **deps:** specify minor and hotfix versions ([c85c252](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/c85c252468227cd7ec893cca29c30010eb7ab6f6))


### Miscellaneous

* add link check workflow ([e3c9653](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/e3c9653ae3dc398becdd57a746e93fa6524b0c70))
* automate release and changelog generation ([948c147](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/948c147a7a949690621e4471092607ca013d6ede))
* **codeql:** remove autobuild action ([26bdc5d](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/26bdc5dd6b1df52d0ebb7e9f731ca7675624bc42))
* **linkcheck:** extend ignored urls ([ec4347c](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/ec4347c16b83473ad89e9e7953b923bae57c3ee7))
* **lint-check:** compress patterns ([c18d9cb](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/c18d9cb9196ddd01d678e08ac606d235cc507450))
* **prettier:** create separate files to allow for CI/CD to use prettier config ([#55](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/issues/55)) ([7447f54](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/7447f5469e7677897cbb40c5ff0e9d5b10bff0e3))
* replace stalebot with github action ([5894e44](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/5894e4488c85b31d900ba650eccd9a54afb1f9c6))
* require `commit-lint` job to pass before automerge ([f36dbb6](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/f36dbb633165195cc6a5528bab8a7276de1836ce))
* **vscode:** remove conflicting prettier ext setting ([6f81c23](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/6f81c23778866d9692b143e7d6d35701135faff0))
* **workflows:** move release steps into `cd` workflow ([6ff81f9](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/6ff81f9dc1b276b0fd9df74b5a0da9a41b56bc37))
* **workflows:** remove redundant comments ([3604402](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/3604402f72ea571f7480f4023c73520136402134))
* **workflows:** rename spellcheck workflow ([468eda5](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/468eda554381ba7412fee2fdc172016842c4b06d))
* **workflows:** tidy node-version syntax ([341909a](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/commit/341909a3a1a8be83ca0b5dd21d66a073d2f8fbe9))

### [1.0.3](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/compare/v1.0.2...v1.0.3) (2021-02-16)

-   build(deps-dev): bump eslint from 7.19.0 to 7.20.0 (#35) ([41a0a02](https://github.com/Fdawgs/ydh-fhir-authentication-service/commit/41a0a02)), closes [#35](https://github.com/Fdawgs/ydh-fhir-authentication-service/issues/35)
-   build(deps-dev): bump eslint-plugin-jsdoc from 31.6.0 to 32.0.1 (#36) ([ba32bba](https://github.com/Fdawgs/ydh-fhir-authentication-service/commit/ba32bba)), closes [#36](https://github.com/Fdawgs/ydh-fhir-authentication-service/issues/36)
-   build(deps-dev): bump eslint-plugin-promise from 4.2.1 to 4.3.1 (#34) ([2cc028e](https://github.com/Fdawgs/ydh-fhir-authentication-service/commit/2cc028e)), closes [#34](https://github.com/Fdawgs/ydh-fhir-authentication-service/issues/34)
-   build(deps-dev): bump faker from 5.2.0 to 5.4.0 (#33) ([621164f](https://github.com/Fdawgs/ydh-fhir-authentication-service/commit/621164f)), closes [#33](https://github.com/Fdawgs/ydh-fhir-authentication-service/issues/33)
-   build(deps-dev): pin husky major version ([e3331ba](https://github.com/Fdawgs/ydh-fhir-authentication-service/commit/e3331ba))
-   build(deps): bump actions/cache from v2 to v2.1.4 (#29) ([dbbfb89](https://github.com/Fdawgs/ydh-fhir-authentication-service/commit/dbbfb89)), closes [#29](https://github.com/Fdawgs/ydh-fhir-authentication-service/issues/29)
-   build(deps): bump env-schema from 2.0.1 to 2.1.0 (#38) ([44be350](https://github.com/Fdawgs/ydh-fhir-authentication-service/commit/44be350)), closes [#38](https://github.com/Fdawgs/ydh-fhir-authentication-service/issues/38)
-   build(deps): bump fastify from 3.11.0 to 3.12.0 (#31) ([ae9d9e3](https://github.com/Fdawgs/ydh-fhir-authentication-service/commit/ae9d9e3)), closes [#31](https://github.com/Fdawgs/ydh-fhir-authentication-service/issues/31)
-   build(deps): bump fastify-bearer-auth from 5.0.2 to 5.1.0 (#32) ([a848b15](https://github.com/Fdawgs/ydh-fhir-authentication-service/commit/a848b15)), closes [#32](https://github.com/Fdawgs/ydh-fhir-authentication-service/issues/32)
-   build(deps): bump pino from 6.11.0 to 6.11.1 (#37) ([b213c6a](https://github.com/Fdawgs/ydh-fhir-authentication-service/commit/b213c6a)), closes [#37](https://github.com/Fdawgs/ydh-fhir-authentication-service/issues/37)
-   build(deps): bump wagoid/commitlint-github-action from v2.0.3 to v2.2.3 (#30) ([ff0e918](https://github.com/Fdawgs/ydh-fhir-authentication-service/commit/ff0e918)), closes [#30](https://github.com/Fdawgs/ydh-fhir-authentication-service/issues/30)
-   ci: add commit-lint job ([a67a263](https://github.com/Fdawgs/ydh-fhir-authentication-service/commit/a67a263))
-   ci: replace typo ci app with action ([2ee435a](https://github.com/Fdawgs/ydh-fhir-authentication-service/commit/2ee435a))
-   ci(dependabot): ignore husky updates ([cda323f](https://github.com/Fdawgs/ydh-fhir-authentication-service/commit/cda323f))
-   style: shorten husky pre-push script ([2159b2a](https://github.com/Fdawgs/ydh-fhir-authentication-service/commit/2159b2a))
-   style(readme): add linebreaks between badges ([bc4fffe](https://github.com/Fdawgs/ydh-fhir-authentication-service/commit/bc4fffe))
-   style(scripts): rename `jest-coverage` to `jest:coverage` ([aa92e38](https://github.com/Fdawgs/ydh-fhir-authentication-service/commit/aa92e38))
-   style(tests): use apa header style for describe name params ([54ba1f8](https://github.com/Fdawgs/ydh-fhir-authentication-service/commit/54ba1f8))
-   chore: add 0bsd and unlicense to list of allowed licenses ([9560a3e](https://github.com/Fdawgs/ydh-fhir-authentication-service/commit/9560a3e))
-   chore: add apache-2.0 to list of allowed licenses ([dd2bf28](https://github.com/Fdawgs/ydh-fhir-authentication-service/commit/dd2bf28))
-   chore: add commitlint husky `commit-msg` hook ([1cc0fee](https://github.com/Fdawgs/ydh-fhir-authentication-service/commit/1cc0fee))
-   chore: add documentation style link to pr template ([2d510c2](https://github.com/Fdawgs/ydh-fhir-authentication-service/commit/2d510c2))
-   chore(vscode): add `redhat.vscode-yaml` as recommended extension ([fa56f02](https://github.com/Fdawgs/ydh-fhir-authentication-service/commit/fa56f02))
-   chore(vscode): add `updateImportsOnFileMove` setting ([afcb796](https://github.com/Fdawgs/ydh-fhir-authentication-service/commit/afcb796))
-   chore(vscode): add workspace settings and extensions ([d94c92c](https://github.com/Fdawgs/ydh-fhir-authentication-service/commit/d94c92c))
-   docs(contributing): add documentation style ([d224628](https://github.com/Fdawgs/ydh-fhir-authentication-service/commit/d224628))
-   docs(readme): add ignore scripts arg ([9885444](https://github.com/Fdawgs/ydh-fhir-authentication-service/commit/9885444))

### [1.0.2](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/compare/v1.0.1...v1.0.2) (2021-02-02)

-   build(deps-dev): bump pino-pretty from 4.4.0 to 4.5.0 ([7feda97](https://github.com/Fdawgs/ydh-fhir-authentication-service/commit/7feda97))
-   refactor(config): update openapi docs from v2.\*.\* to v3.\*.\* ([b08fd73](https://github.com/Fdawgs/ydh-fhir-authentication-service/commit/b08fd73))
-   fix(config): stop rotatinglogstream flooding stdout ([c2bbbb2](https://github.com/Fdawgs/ydh-fhir-authentication-service/commit/c2bbbb2))

### [1.0.1](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/compare/v1.0.0...v1.0.1) (2021-02-01)

-   fix(docker): use node command over npm ([f69649a](https://github.com/Fdawgs/ydh-fhir-authentication-service/commit/f69649a))
-   fix(routes/redirect): id regex ([6452018](https://github.com/Fdawgs/ydh-fhir-authentication-service/commit/6452018))
-   build(deps-dev): bump eslint from 7.18.0 to 7.19.0 (#17) ([20d0d67](https://github.com/Fdawgs/ydh-fhir-authentication-service/commit/20d0d67)), closes [#17](https://github.com/Fdawgs/ydh-fhir-authentication-service/issues/17)
-   build(deps-dev): bump eslint-plugin-jsdoc from 31.4.0 to 31.6.0 (#16) ([8da82ee](https://github.com/Fdawgs/ydh-fhir-authentication-service/commit/8da82ee)), closes [#16](https://github.com/Fdawgs/ydh-fhir-authentication-service/issues/16)
-   build(deps-dev): bump pino-pretty from 4.3.0 to 4.4.0 (#18) ([714381b](https://github.com/Fdawgs/ydh-fhir-authentication-service/commit/714381b)), closes [#18](https://github.com/Fdawgs/ydh-fhir-authentication-service/issues/18)
-   build(deps): bump fastify-disablecache from 1.0.3 to 1.0.4 (#21) ([228a509](https://github.com/Fdawgs/ydh-fhir-authentication-service/commit/228a509)), closes [#21](https://github.com/Fdawgs/ydh-fhir-authentication-service/issues/21)
-   build(deps): bump fastify-helmet from 5.1.0 to 5.2.0 (#15) ([09d6028](https://github.com/Fdawgs/ydh-fhir-authentication-service/commit/09d6028)), closes [#15](https://github.com/Fdawgs/ydh-fhir-authentication-service/issues/15)
-   chore: check that direct dependencies use permissible licenses ([a5d53d9](https://github.com/Fdawgs/ydh-fhir-authentication-service/commit/a5d53d9))
-   chore(routes): specify operationid and produces openapi spec values ([81d24da](https://github.com/Fdawgs/ydh-fhir-authentication-service/commit/81d24da))
-   refactor(server): use new exposed CSP dir from `fastify-helmet` ([8a27d8a](https://github.com/Fdawgs/ydh-fhir-authentication-service/commit/8a27d8a))
-   docs(readme): remove superfluous text in pm2 install instructions ([7719463](https://github.com/Fdawgs/ydh-fhir-authentication-service/commit/7719463))
-   style: capitalise headings correctly ([afc65ed](https://github.com/Fdawgs/ydh-fhir-authentication-service/commit/afc65ed))
-   style(ci): capitalise jobs and job step names ([0df68fd](https://github.com/Fdawgs/ydh-fhir-authentication-service/commit/0df68fd))
-   style(readme): capitalise headings correctly ([a4c84a4](https://github.com/Fdawgs/ydh-fhir-authentication-service/commit/a4c84a4))
-   style(readme): prettier badge shape ([b913667](https://github.com/Fdawgs/ydh-fhir-authentication-service/commit/b913667))
-   style(test_resources): capitalise request names ([6d4e290](https://github.com/Fdawgs/ydh-fhir-authentication-service/commit/6d4e290))
-   style(test_resources): fix name of some requests ([02659ec](https://github.com/Fdawgs/ydh-fhir-authentication-service/commit/02659ec))

## [1.0.0](https://www.github.com/Fdawgs/ydh-fhir-authentication-service/compare/v0.0.1...v1.0.0) (2021-01-27)

-   style: fix spacing ([e0bc579](https://github.com/Fdawgs/ydh-fhir-authentication-service/commit/e0bc579))
-   chore: add insomnia example requests ([b381e0f](https://github.com/Fdawgs/ydh-fhir-authentication-service/commit/b381e0f))
-   chore: add pull request template ([fa411e2](https://github.com/Fdawgs/ydh-fhir-authentication-service/commit/fa411e2))
-   chore: tidy leftover console logs ([917283c](https://github.com/Fdawgs/ydh-fhir-authentication-service/commit/917283c))
-   docs: bump coc from v1.4.0 to v2.0.0 ([4d6294e](https://github.com/Fdawgs/ydh-fhir-authentication-service/commit/4d6294e))
-   docs(readme): add acknowledgements section ([b524f15](https://github.com/Fdawgs/ydh-fhir-authentication-service/commit/b524f15))
-   docs(readme): add description ([f69d175](https://github.com/Fdawgs/ydh-fhir-authentication-service/commit/f69d175))
-   docs(readme): remove env arg from pm2 deployment step ([7f32969](https://github.com/Fdawgs/ydh-fhir-authentication-service/commit/7f32969))
-   docs(readme): remove reference to docs route ([04a82e2](https://github.com/Fdawgs/ydh-fhir-authentication-service/commit/04a82e2))
-   feat(routes): return reply from redirected url ([420e53a](https://github.com/Fdawgs/ydh-fhir-authentication-service/commit/420e53a))
-   feat(routes/redirect): validate accept request header ([23ebb21](https://github.com/Fdawgs/ydh-fhir-authentication-service/commit/23ebb21))
-   build(deps-dev): add husky for git hook handling ([cb1931d](https://github.com/Fdawgs/ydh-fhir-authentication-service/commit/cb1931d))
-   build(deps-dev): bump eslint-plugin-jsdoc from 31.0.8 to 31.4.0 (#13) ([5cbbb54](https://github.com/Fdawgs/ydh-fhir-authentication-service/commit/5cbbb54)), closes [#13](https://github.com/Fdawgs/ydh-fhir-authentication-service/issues/13)
-   build(deps-dev): bump faker from 5.1.0 to 5.2.0 (#12) ([08429ab](https://github.com/Fdawgs/ydh-fhir-authentication-service/commit/08429ab)), closes [#12](https://github.com/Fdawgs/ydh-fhir-authentication-service/issues/12)
-   build(deps): add fastify-accepts ([f4cf7cd](https://github.com/Fdawgs/ydh-fhir-authentication-service/commit/f4cf7cd))
-   build(deps): bump fastify from 3.10.1 to 3.11.0 (#10) ([1703bbb](https://github.com/Fdawgs/ydh-fhir-authentication-service/commit/1703bbb)), closes [#10](https://github.com/Fdawgs/ydh-fhir-authentication-service/issues/10)
-   build(deps): bump fastify-autoload from 3.4.0 to 3.4.2 (#11) ([2438f2a](https://github.com/Fdawgs/ydh-fhir-authentication-service/commit/2438f2a)), closes [#11](https://github.com/Fdawgs/ydh-fhir-authentication-service/issues/11)
-   build(deps): replace axios with fastify-reply-from ([4637669](https://github.com/Fdawgs/ydh-fhir-authentication-service/commit/4637669))
-   test(plugins/jwt-jwks-auth): ignore coverage ([bb81dc0](https://github.com/Fdawgs/ydh-fhir-authentication-service/commit/bb81dc0))
-   test(server): add cors assertions ([affbbf1](https://github.com/Fdawgs/ydh-fhir-authentication-service/commit/affbbf1))
-   test(server): add server tests ([967830a](https://github.com/Fdawgs/ydh-fhir-authentication-service/commit/967830a))
-   test(server): set missing redirecturl config value ([1a28b5a](https://github.com/Fdawgs/ydh-fhir-authentication-service/commit/1a28b5a))
-   fix(config): add required properties ([af8369c](https://github.com/Fdawgs/ydh-fhir-authentication-service/commit/af8369c))
-   fix(routes/redirect): add required properties ([3eb08c6](https://github.com/Fdawgs/ydh-fhir-authentication-service/commit/3eb08c6))
-   refactor(cors): add cors handling ([ea4b172](https://github.com/Fdawgs/ydh-fhir-authentication-service/commit/ea4b172))
-   refactor(plugins): convert jwt-jwks util to fastify plugin ([7e954d1](https://github.com/Fdawgs/ydh-fhir-authentication-service/commit/7e954d1))
-   refactor(routes/redirect): separate read and search routes ([24e6cd7](https://github.com/Fdawgs/ydh-fhir-authentication-service/commit/24e6cd7))
-   ci: cache on `node-version` as well as `os` ([0019285](https://github.com/Fdawgs/ydh-fhir-authentication-service/commit/0019285))
-   ci: fix license checker step ([d52e3d5](https://github.com/Fdawgs/ydh-fhir-authentication-service/commit/d52e3d5))
-   ci(github-actions): set `flag-name` for parallel coverage tests ([48c5f78](https://github.com/Fdawgs/ydh-fhir-authentication-service/commit/48c5f78))
-   ci(github-actions): set semver for coverallsapp ([9536bf0](https://github.com/Fdawgs/ydh-fhir-authentication-service/commit/9536bf0))

### 0.0.1 (2021-01-22)

-   feat(config): add jwt and bearer token env variable validation ([447aa69](https://github.com/Fdawgs/ydh-fhir-authentication-service/commit/447aa69))
-   feat(routes): add basic wildcard route ([0e004db](https://github.com/Fdawgs/ydh-fhir-authentication-service/commit/0e004db))
-   feat(routes): add healthcheck route ([f9d9b4c](https://github.com/Fdawgs/ydh-fhir-authentication-service/commit/f9d9b4c))
-   style: adhere to prettier standard ([5920fa4](https://github.com/Fdawgs/ydh-fhir-authentication-service/commit/5920fa4))
-   build(docker): speed up install by using `npm ci` over `npm install` ([6ba7b54](https://github.com/Fdawgs/ydh-fhir-authentication-service/commit/6ba7b54))
-   refactor(pm2): use repo name for instances; remove redundant env setting ([18671ae](https://github.com/Fdawgs/ydh-fhir-authentication-service/commit/18671ae))
-   test(config): remove failing assertion ([6d0d976](https://github.com/Fdawgs/ydh-fhir-authentication-service/commit/6d0d976))
-   chore: add template files ([635aabd](https://github.com/Fdawgs/ydh-fhir-authentication-service/commit/635aabd))
-   Initial commit ([1a2e995](https://github.com/Fdawgs/ydh-fhir-authentication-service/commit/1a2e995))

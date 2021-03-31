# Changelog

All notable changes to this project will be documented in this file.

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

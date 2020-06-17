# Red Sourcepoint CMP

[![npm](https://img.shields.io/npm/v/@spring-media/red-sourcepoint-cmp)](https://www.npmjs.com/package/@spring-media/red-sourcepoint-cmp)
[![license](https://img.shields.io/npm/l/@spring-media/red-sourcepoint-cmp)](https://github.com/spring-media/red-sourcepoint-cmp/blob/master/LICENSE)
[![storybook](https://img.shields.io/badge/Storybook-Vue-informational?logo=storybook&style=flat)](https://spring-media.github.io/red-sourcepoint-cmp)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=spring-media_red-sourcepoint-cmp&metric=coverage)](https://sonarcloud.io/dashboard?id=spring-media_red-sourcepoint-cmp)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=spring-media_red-sourcepoint-cmp&metric=alert_status)](https://sonarcloud.io/dashboard?id=spring-media_red-sourcepoint-cmp)

* [Introduction](#introduction)
* [Installation](#installation)
* [Modules](#modules)
  * [Vendor Mapping](#vendor-mapping-module)
  * [TCF V2](#tcf-v2-api-module)
  * [Sourcepoint](#sourcepoint-module)
  * [Embed Utils](#embed-utils-module)
  * [Vue](#vue-module)
* [Playground](#playground)

# Introduction

This repository covers the implementation of CMP (Consent Management Platform) for www.bild.de by using the Sourcepoint API.

## Installation

```sh
npm i @spring-media/red-sourcepoint-cmp
```

## Modules

The project is organised into several (mostly) independent modules, that are described below:

## Vendor Mapping Module

An API for (hardcoded) mappings of (custom) vendors and purposes and their relations between each other.

[Documentation](src/vendor-mapping#vendor-mapping-module)

## TCF-V2 API Module

An (tiny) abstraction layer for the IAB TCF-V2 specs

[Documentation](src/tcf-v2#tcf-v2-api-module)

## Sourcepoint Module

An (tiny) abstraction layer for the Sourcepoint API

[Documentation](src/sourcepoint#sourcepoint-module)

## Embed Utils Module

A collection of utils for handling (social) embeds.

[Documentation](src/embed-utils#embed-utils-module)

## Vue Module

A collection of Vue components for the integration of the API's above.

[Documentation](src/vue#vue-integration-module)

## Playground

The purpose of the playground is to test the feature set of our library (manually and automated) within a browser.
It uses the compiled modules from the dist folder to provide two small applications, one for the esm bundle and one for the browser bundle.

Start the playground by running the following command:
```shell
npm run playground:start
```

Some questions are asking the first time, with some predefined sensible default settings.

<p>
  <img src="./docs/playground-prepare-dialogue.png" alt="Playground Prepare Dialogue" width="678" />
</p>

You can use cli parameters to overwrite internal default values as follows:
```shell
npm run playground:start -- --propertyId 1234
```
The example above sets the default value for propertyId to 1234.

> You can also use --yes to skip the questionnaire altogether. In this case, the internal default values (or provided by cli) will be used as the parameters for the playground.

> Use a modern browser for testing because the code is not transformed to be compatible with older browsers that do not fully support ES6.

### Running automatic end-2-end tests

In addition to manual testing, there is also the option of automatically testing the playground through end-2-end tests.

In order to do so, make sure the playground application is running (`npm run playground:start`) and then (in another terminal) run `npm run playground:test:e2e`.

> The tests use some values from the parameters.json file, which is automatically created in the build directory after the playground has been prepared.

## Releasing and Publishing

This repository uses [semantic release](https://semantic-release.gitbook.io/semantic-release/) 
for automated releasing and publishing to the [npm registry]((https://www.npmjs.com/package/@spring-media/red-sourcepoint-cmp)) and 
[github](https://github.com/spring-media/red-sourcepoint-cmp/releases).

Each release step is configured via [release config](release.config.js) 
by configurable [plugins](https://github.com/semantic-release/semantic-release/blob/master/docs/usage/plugins.md).

Semantic-release uses the commit messages to determine the type of changes in the codebase. 
To automatically determine the next semantic version number and automate publishing the release 
following commit message format is required:

```
<type>(<scope>): <subject>
```

##### Type

must be one of the following:
- feat: A new feature (minor)
- fix: A bug fix (patch)
- breaking: A breaking change (major)
- revert: When reverting a previous commit (patch)
- perf: A code change that improves performance (patch)
- docs: Documentation only changes
- style: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- chore: Changes to the build process

##### Scope

The scope could be anything specifying place of the commit change. 
You can use * when the change affects more than a single scope.

##### Subject

The subject contains succinct description of the change:
- use the imperative, present tense: "change" not "changed" nor "changes"
- don't capitalize first letter

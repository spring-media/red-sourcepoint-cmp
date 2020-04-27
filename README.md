# Red Sourcepoint CMP

[![npm](https://img.shields.io/npm/v/@spring-media/red-sourcepoint-cmp)](https://www.npmjs.com/package/@spring-media/red-sourcepoint-cmp)
[![license](https://img.shields.io/npm/l/@spring-media/red-sourcepoint-cmp)](https://github.com/spring-media/red-sourcepoint-cmp/blob/master/LICENSE)
[![storybook](https://img.shields.io/badge/Storybook-Live-informational?logo=storybook&style=flat)](https://spring-media.github.io/red-sourcepoint-cmp)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

# Introduction

This repository covers the implementation of CMP (Content Management Platform) for www.bild.de by using the Sourcepoint API.

## Installation

```sh
npm i @spring-media/red-sourcepoint-cmp
```

## Modules

The project is organised into several (mostly) independent modules, that are described below:

## Static Vendor Mapping Module

An API for (hardcoded) mappings of (custom) vendors and purposes and their relations between each other.

[Documentation](src/vendor-mapping#static-vendor-mapping-module)

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

# Introduction

This repository covers the implementation of CMP (Content Management Platform) for www.bild.de by using the Sourcepoint API.

## Installation

```sh
npm i @spring-media/red-sourcepoint-cmp
```

## Packages

The project is organised into several (mostly) independent packages, that are described below:

## Static Vendor Mapping Package

An API for (hardcoded) mappings of (custom) vendors and purposes and their relations between each other.

[Documentation](src/vendor-mapping#static-vendor-mapping-package)

## TCF-V2 API Package

An (tiny) abstraction layer for the IAB TCF-V2 specs

[Documentation](src/tcf-v2#tcf-v2-api-package)

## Sourcepoint Package

An (tiny) abstraction layer for the Sourcepoint API

[Documentation](src/sourcepoint#sourcepoint-package)

## Embed Utils Package

A collection of utils for handling (social) embeds.

[Documentation](src/embed-utils#embed-utils-package)

## Vue Package

A collection of Vue components for the integration of the API's above.

[Documentation](src/vue#vue-integration-package)

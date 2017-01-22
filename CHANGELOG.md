# CHANGELOG

All notable changes to [ek9/generator-license-cc][0] package will be documented
in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## UNRELEASED

- Fixed compatibility with other license generators (see below) - #18
- **BC BREAK** Updated option names to be generator specific:
    - `license` is now `ccLicense`.
    - `licensePrompt` is now `ccLicensePrompt`.
    - `work` is now `ccWork`.
- **BC BREAK** Updated structure of the generator from `generators/app` to
  `generators`. When using this as a sub-generator, make sure to use the new
  structure when using `.composeWith`.

    **New Syntax**

    ```js
    this.composeWith(require.resolve('generator-license-cc/app'), {
      // ....
    }
    ```
    **Old Syntax**

    ```js
    this.composeWith(require.resolve('generator-license-cc/generators/app'), {
      // ....
    }
    ```
- Fixed `main` definition in `package.json` to point to
  `app/index.js`
- Update `.gitattributes` file to exclude directories and files from dist.

## 1.0.1 - 2017-01-22

- Add information upon license creation with a message to verify the license is
  suitable.

## 1.0.0 - 2017-01-18

- Support for all Creative Commons 4.0 Licenses
- Support for CC0 Public Domain
- License chooser based on https://creativecommons.org/choose/
- Finalized the API

## 0.9.7 - 2017-01-15

- Fixed a bug that would generate NaN when using year ranges.
- Added CC0 Public Domain
- Final API tweaks for options

## 0.0.1 - 2017-01-07

- Initial public release with basic license generation.
- Basic tests and structure for the generator

[0]: https://github.com/ek9/generator-license-cc

# generator-license-cc

[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Coverage Status][coverage-image]][coverage-url]
[![Dependency Status][daviddm-image]][daviddm-url]

```bash
# Generate a Creative Commons LICENSE for your Creative Work
yo license-cc
```

**Now coming with a [license chooser][2] integrated to help you pick
LICENSE!**

[![asciicast](https://asciinema.org/a/99699.png)](https://asciinema.org/a/99699)

## Install

First, install [Yeoman](http://yeoman.io) and generator-license-cc using
[npm](https://www.npmjs.com/) (we assume you have pre-installed
[node.js](https://nodejs.org/)).

```bash
npm install -g yo
npm install -g generator-license-cc
```

## Usage

Generate a Creative Commons LICENSE for your Creative Work:

```bash
yo license-cc
```

## Composability with other generators

`generator-license-cc` can be used when composing your own generator. An
example code how to trigger this generator:

```js
this.composeWith(require.resolve('generator-license-cc/generators/app'), {
  name: 'Bob A',                      // (optional) Author's Name
  work: 'ProjectX Documentation',     // (optional) Work Title
  email: 'bob@example.org',           // (optional) Author's Email
  website: 'http://www.example.org',  // (optional) Author's Website
  year: '2016-2017',                  // (optional) Year(s) to include
  licensePrompt: 'Choose a License:', // (optional) custom license prompt text
  output: 'docs/LICENSE'              // (optional) choose output file for license
});
```

In order to get a list of licenses supported in this generator, you can call:

```js
require('generator-license-cc').licenses
```

**Note:** Make sure you have `generator-license-cc` as a `dependency` in your
generator's `package.json`:

    $ npm install --save generator-license-cc

For more information read [Yeoman's Documentation page on Composability][1].

### Creative Common Licenses

This generator allows you to generate `LICENSE` file for your project with one
of [Creative Commons Licenses][10]:

- `CC-BY-4.0` [Ceative Commons Attribution 4.0 License][11]
- `CC-BY-SA-4.0` [Cretive Commons Attribution Share Alike 4.0 License][12]
- `CC-BY-ND-4.0` [Cretive Commons Attribution No Deriveratives 4.0 License][13]
- `CC-BY-NC-4.0` [Cretive Commons Attribution Non Commercial 4.0 License][14]
- `CC-BY-NC-SA-4.0` [Cretive Commons Attribution Non Commercial Share Alike 4.0 License][15]
- `CC-BY-NC-ND-4.0` [Cretive Commons Attribution Non Commercial No Deriveratives 4.0][16]

Alternatively, you can pick [CC0 Public Domain 1.0][17] to waive all copyright.

### Getting To Know Yeoman

* Yeoman has a heart of gold.
* Yeoman is a person with feelings and opinions, but is very easy to work with.
* Yeoman can be too opinionated at times but is easily convinced not to be.
* Feel free to [learn more about Yeoman](http://yeoman.io/).

## Author

Copyright (c) 2017 ek9 <dev@ek9.co> (https://ek9.co)

## License

This work is licensed under [MIT LICENSE](LICENSE).

[1]: http://yeoman.io/authoring/composability.html
[2]: https://creativecommons.org/choose/

[10]: https://creativecommons.org/licenses/
[11]: https://creativecommons.org/licenses/by/4.0/
[12]: https://creativecommons.org/licenses/by-sa/4.0/
[13]: https://creativecommons.org/licenses/by-nd/4.0/
[14]: https://creativecommons.org/licenses/by-nc/4.0/
[15]: https://creativecommons.org/licenses/by-nc-sa/4.0/
[16]: https://creativecommons.org/licenses/by-nc-nd/4.0/
[17]: https://creativecommons.org/publicdomain/zero/1.0/

[npm-image]: https://badge.fury.io/js/generator-license-cc.svg
[npm-url]: https://npmjs.org/package/generator-license-cc
[travis-image]: https://travis-ci.org/ek9/generator-license-cc.svg?branch=master
[travis-url]: https://travis-ci.org/ek9/generator-license-cc
[daviddm-image]: https://david-dm.org/ek9/generator-license-cc.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/ek9/generator-license-cc
[coverage-image]: https://coveralls.io/repos/github/ek9/generator-license-cc/badge.svg
[coverage-url]: https://coveralls.io/github/ek9/generator-license-cc


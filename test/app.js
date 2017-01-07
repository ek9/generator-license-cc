'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

var testName = 'Bob Jr';
var testWork = 'Test Work';
var testEmail = 'bob@example.com';
var testWebsite = 'http://www.example.com';
var testLicenses = [
  'CC-BY-4.0',
  'CC-BY-SA-4.0',
  'CC-BY-ND-4.0',
  'CC-BY-NC-4.0',
  'CC-BY-NC-SA-4.0',
  'CC-NY-NC-ND-4.0'
];

var testOutput = 'LICENSE';

describe('generator-license-cc:app', function () {
  before(function () {
    return helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        name: testName,
        work: testWork,
        email: testEmail,
        website: testWebsite,
        license: testLicenses[0],
        output: testOutput
      }).toPromise();
  });

  it('creates LICENSE file', function () {
    assert.file([
      'LICENSE'
    ]);
  });

  it('does not create package.json file', function () {
    assert.noFile('package.json');
  });
});

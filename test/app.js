'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

var testName = 'Bob Jr';
var testWork = 'Test Work';
var testYear = '2016-2017';
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
var testHeader = testWork + ' (c) ' + testYear + ' ' + testName + ' <' + testEmail + '> (' + testWebsite + ')';

var testOutput = 'LICENSE';

describe('generator-license-cc:app CC-BY-4.0', function () {
  before(function () {
    return helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        name: testName,
        work: testWork,
        year: testYear,
        email: testEmail,
        website: testWebsite,
        license: testLicenses[0],
        output: testOutput
      }).toPromise();
  });

  it('creates CC-BY-4.0 LICENSE file with correct data', function () {
    assert.fileContent(testOutput, testHeader);
    assert.fileContent(testOutput, 'Creative Commons Attribution 4.0 International License.');
    assert.fileContent(testOutput, 'creativecommons.org/licenses/by/4.0');
    assert.fileContent(testOutput, 'Attribution 4.0 International');
  });
});

describe('generator-license-cc:app CC-BY-SA-4.0', function () {
  before(function () {
    return helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        name: testName,
        work: testWork,
        year: testYear,
        email: testEmail,
        website: testWebsite,
        license: testLicenses[0],
        output: testOutput
      }).toPromise();
  });

  it('creates CC-BY-SA-4.0 LICENSE file with correct data', function () {
    assert.fileContent(testOutput, testHeader);
    assert.fileContent(testOutput, 'Creative Commons Attribution-ShareAlike 4.0 International License.');
    assert.fileContent(testOutput, 'creativecommons.org/licenses/by-sa/4.0');
    assert.fileContent(testOutput, 'Attribution-ShareAlike 4.0 International');
  });
});

describe('generator-license-cc:app CC-BY-ND-4.0', function () {
  before(function () {
    return helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        name: testName,
        work: testWork,
        year: testYear,
        email: testEmail,
        website: testWebsite,
        license: testLicenses[0],
        output: testOutput
      }).toPromise();
  });

  it('creates CC-BY-ND-4.0 LICENSE file with correct data', function () {
    assert.fileContent(testOutput, testHeader);
    assert.fileContent(testOutput, 'Creative Commons Attribution-NoDerivs 4.0 International License.');
    assert.fileContent(testOutput, 'creativecommons.org/licenses/by-na/4.0');
    assert.fileContent(testOutput, 'Attribution-NoDerivs 4.0 International');
  });
});

describe('generator-license-cc:app CC-BY-NC-4.0', function () {
  before(function () {
    return helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        name: testName,
        work: testWork,
        year: testYear,
        email: testEmail,
        website: testWebsite,
        license: testLicenses[0],
        output: testOutput
      }).toPromise();
  });

  it('creates CC-BY-NC-4.0 LICENSE file with correct data', function () {
    assert.fileContent(testOutput, testHeader);
    assert.fileContent(testOutput, 'Creative Commons Attribution-NonCommercial 4.0 International License.');
    assert.fileContent(testOutput, 'creativecommons.org/licenses/by-na/4.0');
    assert.fileContent(testOutput, 'Attribution-NonCommercial 4.0 International');
  });
});

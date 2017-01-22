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
  'CC-BY-NC-ND-4.0',
  'CC0-1.0'
];
var testHeader = testWork + ' (c) ' + testYear + ' ' + testName + ' <' + testEmail + '> (' + testWebsite + ')';
var testHeaderCC0 = 'To the extent possible under law, ' + testName +
  '\nhas waived all copyright and related or neighboring rights to\n' + testWork;

var testOutput = 'LICENSE';

describe('generator-license-cc:app CC-BY-4.0', function () {
  before(function () {
    return helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        name: testName,
        ccWork: testWork,
        year: testYear,
        email: testEmail,
        website: testWebsite,
        ccLicense: testLicenses[0],
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
        ccWork: testWork,
        year: testYear,
        email: testEmail,
        website: testWebsite,
        ccLicense: testLicenses[1],
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
        ccWork: testWork,
        year: testYear,
        email: testEmail,
        website: testWebsite,
        ccLicense: testLicenses[2],
        output: testOutput
      }).toPromise();
  });

  it('creates CC-BY-ND-4.0 LICENSE file with correct data', function () {
    assert.fileContent(testOutput, testHeader);
    assert.fileContent(testOutput, 'Creative Commons Attribution-NoDerivatives 4.0 International License.');
    assert.fileContent(testOutput, 'creativecommons.org/licenses/by-nd/4.0');
    assert.fileContent(testOutput, 'Attribution-NoDerivatives 4.0 International');
  });
});

describe('generator-license-cc:app CC-BY-NC-4.0', function () {
  before(function () {
    return helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        name: testName,
        ccWork: testWork,
        year: testYear,
        email: testEmail,
        website: testWebsite,
        ccLicense: testLicenses[3],
        output: testOutput
      }).toPromise();
  });

  it('creates CC-BY-NC-4.0 LICENSE file with correct data', function () {
    assert.fileContent(testOutput, testHeader);
    assert.fileContent(testOutput, 'Creative Commons Attribution-NonCommercial 4.0 International License.');
    assert.fileContent(testOutput, 'creativecommons.org/licenses/by-nc/4.0');
    assert.fileContent(testOutput, 'Attribution-NonCommercial 4.0 International');
  });
});

describe('generator-license-cc:app CC-BY-NC-SA-4.0', function () {
  before(function () {
    return helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        name: testName,
        ccWork: testWork,
        year: testYear,
        email: testEmail,
        website: testWebsite,
        ccLicense: testLicenses[4],
        output: testOutput
      }).toPromise();
  });

  it('creates CC-BY-NC-SA-4.0 LICENSE file with correct data', function () {
    assert.fileContent(testOutput, testHeader);
    assert.fileContent(testOutput, 'Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License.');
    assert.fileContent(testOutput, 'creativecommons.org/licenses/by-nc-sa/4.0');
    assert.fileContent(testOutput, 'Attribution-NonCommercial-ShareAlike 4.0 International');
  });
});

describe('generator-license-cc:app CC-BY-NC-ND-4.0', function () {
  before(function () {
    return helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        name: testName,
        ccWork: testWork,
        year: testYear,
        email: testEmail,
        website: testWebsite,
        ccLicense: testLicenses[5],
        output: testOutput
      }).toPromise();
  });

  it('creates CC-BY-NC-ND-4.0 LICENSE file with correct data', function () {
    assert.fileContent(testOutput, testHeader);
    assert.fileContent(testOutput, 'Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International License.');
    assert.fileContent(testOutput, 'creativecommons.org/licenses/by-nc-nd/4.0');
    assert.fileContent(testOutput, 'Attribution-NonCommercial-NoDerivatives 4.0 International');
  });
});

describe('generator-license-cc:app CC0-1.0', function () {
  before(function () {
    return helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        name: testName,
        ccWork: testWork,
        ccLicense: testLicenses[6],
        output: testOutput
      }).toPromise();
  });

  it('creates CC0-1.0 LICENSE file with correct data', function () {
    assert.fileContent(testOutput, testHeaderCC0);
    assert.fileContent(testOutput, 'has waived all copyright and related or neighboring rights');
    assert.fileContent(testOutput, 'creativecommons.org/publicdomain/zero/1.0');
    assert.fileContent(testOutput, 'CC0 1.0 Universal');
  });
});

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
  'CC-BY-4.0'
];
var testOutput = 'LICENSE';

var testHeaderFull =
  testWork + ' (c) ' + testYear + ' ' + testName + ' <' + testEmail + '> (' + testWebsite + ')';
var testHeaderNoContacts =
  testWork + ' (c) ' + testYear + ' ' + testName;
var testHeaderNoContactsWebsite =
  testWork + ' (c) ' + testYear + ' ' + testName + ' <' + testEmail + '>';
var testHeaderNoContactsEmail =
  testWork + ' (c) ' + testYear + ' ' + testName + ' (' + testWebsite + ')';

var testHeaderNoYear =
  testWork + ' (c)  ' + testName;

describe('generator-license-cc:app', function () {
  before(function () {
    return helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        name: testName,
        work: testWork,
        year: testYear,
        email: testEmail,
        website: testWebsite,
        licensePrompt: 'Choose a License:',
        license: testLicenses[0],
        output: testOutput
      }).toPromise();
  });

  it('creates LICENSE file with correct data', function () {
    assert.fileContent(testOutput, testHeaderFull);
  });
});

describe('generator-license-cc:app no contact details', function () {
  before(function () {
    return helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        name: testName,
        work: testWork,
        year: testYear,
        license: testLicenses[0],
        output: testOutput
      }).toPromise();
  });

  it('creates LICENSE file with correct data', function () {
    assert.fileContent(testOutput, testHeaderNoContacts);
  });
});

describe('generator-license-cc:app no contact details - email', function () {
  before(function () {
    return helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        name: testName,
        website: testWebsite,
        work: testWork,
        year: testYear,
        license: testLicenses[0],
        output: testOutput
      }).toPromise();
  });

  it('creates LICENSE file with correct data', function () {
    assert.fileContent(testOutput, testHeaderNoContactsEmail);
  });
});

describe('generator-license-cc:app no contact details - website', function () {
  before(function () {
    return helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        name: testName,
        email: testEmail,
        work: testWork,
        year: testYear,
        license: testLicenses[0],
        output: testOutput
      }).toPromise();
  });

  it('creates LICENSE file with correct data', function () {
    assert.fileContent(testOutput, testHeaderNoContactsWebsite);
  });
});

describe('generator-license-cc:app no contact details + no year', function () {
  before(function () {
    return helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        name: testName,
        work: testWork,
        license: testLicenses[0],
        output: testOutput
      }).toPromise();
  });

  it('creates LICENSE file with correct data', function () {
    assert.fileContent(testOutput, testHeaderNoYear);
  });
});

describe('generator-license-cc:app passnameas option', function () {
  before(function () {
    return helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        work: testWork,
        license: testLicenses[0],
        output: testOutput
      }).withOptions({
        name: testName
      }).toPromise();
  });

  it('creates LICENSE file with correct data', function () {
    assert.fileContent(testOutput, testHeaderNoYear);
  });
});

'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

var testName = 'Bob Jr';
var testWork = 'Test Work';
var testYear = '2016-2017';
var testEmail = 'bob@example.com';
var testWebsite = 'http://www.example.com';
var testLicense = 'chooser';
var testHeader = testWork + ' (c) ' + testYear + ' ' + testName + ' <' + testEmail + '> (' + testWebsite + ')';

var testOutput = 'LICENSE';

describe('generator-license-cc:chooser CC-BY-4.0', function () {
  before(function () {
    return helpers.run(path.join(__dirname, '../app'))
      .withPrompts({
        name: testName,
        creativeWork: testWork,
        year: testYear,
        email: testEmail,
        website: testWebsite,
        ccLicense: testLicense,
        chooserAdaptations: 'Yes',
        chooserCommercial: 'Yes',
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

describe('generator-license-cc:chooser CC-BY-SA-4.0', function () {
  before(function () {
    return helpers.run(path.join(__dirname, '../app'))
      .withPrompts({
        name: testName,
        creativeWork: testWork,
        year: testYear,
        email: testEmail,
        website: testWebsite,
        ccLicense: testLicense,
        chooserAdaptations: 'Share',
        chooserCommercial: 'Yes',
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

describe('generator-license-cc:chooser CC-BY-ND-4.0', function () {
  before(function () {
    return helpers.run(path.join(__dirname, '../app'))
      .withPrompts({
        name: testName,
        creativeWork: testWork,
        year: testYear,
        email: testEmail,
        website: testWebsite,
        ccLicense: testLicense,
        chooserAdaptations: 'No',
        chooserCommercial: 'Yes',
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

describe('generator-license-cc:chooser CC-BY-NC-4.0', function () {
  before(function () {
    return helpers.run(path.join(__dirname, '../app'))
      .withPrompts({
        name: testName,
        creativeWork: testWork,
        year: testYear,
        email: testEmail,
        website: testWebsite,
        ccLicense: testLicense,
        chooserAdaptations: 'Yes',
        chooserCommercial: 'No',
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

describe('generator-license-cc:chooser CC-BY-NC-SA-4.0', function () {
  before(function () {
    return helpers.run(path.join(__dirname, '../app'))
      .withPrompts({
        name: testName,
        creativeWork: testWork,
        year: testYear,
        email: testEmail,
        website: testWebsite,
        ccLicense: testLicense,
        chooserAdaptations: 'Share',
        chooserCommercial: 'No',
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

describe('generator-license-cc:chooser CC-BY-NC-ND-4.0', function () {
  before(function () {
    return helpers.run(path.join(__dirname, '../app'))
      .withPrompts({
        name: testName,
        creativeWork: testWork,
        year: testYear,
        email: testEmail,
        website: testWebsite,
        ccLicense: testLicense,
        chooserAdaptations: 'No',
        chooserCommercial: 'No',
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

'use strict';
var Generator = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var gitConfig = require('git-config');

const licenses = [
  {name: 'CC BY Attribution 4.0 License', value: 'CC-BY-4.0'},
  {name: 'CC BY-SA Attribution-ShareAlike 4.0 License', value: 'CC-BY-SA-4.0'},
  {name: 'CC BY-ND Attribution-NoDerivs 4.0 License', value: 'CC-BY-ND-4.0'},
  {name: 'CC BY-NC Attribution-NonCommercial 4.0 License', value: 'CC-BY-NC-4.0'},
  {name: 'CC BY-NC-SA Attribution-NonCommercial-ShareAlike 4.0 License', value: 'CC-BY-NC-SA-4.0'},
  {name: 'CC BY-NC-ND Attribution-NonCommercial-NoDerivs 4.0 License', value: 'CC-BY-NC-ND-4.0'},
  {name: 'CC0 Public Domain 1.0 - Waive all copyright', value: 'CC0-1.0'}
];

module.exports = Generator.extend({

  constructor: function () {
    Generator.apply(this, arguments);

    // define all options/arguments for generator
    this.option('name', {
      type: String,
      desc: 'Author\'s Name',
      required: true
    });

    this.option('work', {
      type: String,
      desc: 'Licensed Work Title',
      required: true
    });

    this.option('email', {
      type: String,
      desc: 'Author\'s Email',
      required: false
    });

    this.option('website', {
      type: String,
      desc: 'Author\'s Website',
      required: false
    });

    this.option('year', {
      type: String,
      desc: 'Year(s) to include on the license (e.g. 2016-2017)',
      required: true,
      defaults: (new Date()).getFullYear()
    });

    this.option('license', {
      type: String,
      desc: 'License to Generate: CC-BY-4.0, CC-BY-SA-4.0, CC-BY-ND-4.0, CC-BY-NC-4.0, CC-BY-NC-SA-4.0, CC-BY-NC-ND-4.0, CC0-1.0',
      required: true
    });

    this.option('output', {
      type: String,
      desc: 'Output file',
      default: 'LICENSE',
      required: true
    });
  },

  initializing: function () {
    // init git config
    this.gitc = gitConfig.sync();
    // get name via argument or fallback to git
    if (this._initOptions.name) {
      this.options.name = this._initOptions.name;
    } else if (this.gitc.user) {
      this.options.name = this.gitc.user.name;
    }

    // get email via argument or fallback to git
    if (this._initOptions.email) {
      this.options.email = this._initOptions.email;
    } else if (this.gitc.user) {
      this.options.email = this.gitc.user.email;
    }

    this.options.work = this._initOptions.work;
    this.options.year = this._initOptions.year;
    this.options.website = this._initOptions.website;
    this.options.output = this._initOptions.output || this.options.output;

    // Have Yeoman greet the user.
    this.log(yosay(
      'Generate Creative Commons LICENSE with ' +
        chalk.red('license-cc') + ' generator!'
    ));
  },

  prompting: {
    requiredPrompt() {
      var prompts = [
        {
          name: 'name',
          message: 'Author\'s Name:',
          default: this.options.name,
          when: !this._initOptions.name
        },
        {
          name: 'work',
          message: 'Licensed Work Title:',
          default: this.options.work,
          when: !this._initOptions.work
        },
        {
          name: 'year',
          message: 'Year(s) to include on the license (e.g. 2016-2017)',
          default: this.options.year,
          when: !this.options.year
        }
      ];

      return this.prompt(prompts).then(function (answers) {
        if (answers.name) {
          this.options.name = answers.name.trim();
        }

        if (answers.work) {
          this.options.work = answers.work.trim();
        }

        if (answers.year) {
          this.options.year = answers.year;
        }
      }.bind(this));
    },
    contactConfirmPrompt() {
      var prompts = [
        {
          type: 'confirm',
          name: 'contactDetails',
          message: 'Would you like to add contact details?',
          default: true,
          when: !this._initOptions.email && !this._initOptions.website
        }
      ];

      return this.prompt(prompts).then(function (answers) {
        this.options.contactDetails = answers.contactDetails;
      }.bind(this));
    },

    contactEmailPrompt() {
      if (this.options.contactDetails && !this._initOptions.email) {
        var prompts = [
          {
            name: 'email',
            message: 'Author\'s Email:',
            default: this.options.email
          }
        ];

        return this.prompt(prompts).then(function (answers) {
          this.options.email = answers.email;
        }.bind(this));
      }
    },

    contactWebsitePrompt() {
      if (this.options.contactDetails && !this._initOptions.website) {
        var prompts = [
          {
            name: 'website',
            message: 'Author\'s Website:',
            default: this.options.website
          }
        ];

        return this.prompt(prompts).then(function (answers) {
          this.options.website = answers.website;
        }.bind(this));
      }
    },
    licensePrompt() {
      var prompts = [
        {
          type: 'list',
          name: 'license',
          message: 'Choose a Creative Commons License:',
          default: this.options.license,
          choices: licenses,
          when: !this._initOptions.license
        },
        {
          name: 'output',
          message: 'Output file:',
          default: 'LICENSE',
          when: !this._initOptions.output
        }

      ];

      return this.prompt(prompts).then(function (answers) {
        if (answers.license) {
          this.options.license = answers.license;
        }

        if (answers.output) {
          this.options.output = answers.output;
        }
      }.bind(this));
    }
  },

  writing: function () {
    // check license file
    var filename = this.options.license + '.txt';
    if (!this.fs.exists(this.templatePath(filename))) {
      throw new Error('License \'' + filename + '\' NOT FOUND!');
    }

    // combine author data
    let author = this.options.name;
    if (this.options.email) {
      author += ' <' + this.options.email + '>';
    }
    if (this.options.website) {
      author += ' (' + this.options.website + ')';
    }

    // generate LICENSE from teplate file
    this.fs.copyTpl(
      this.templatePath(filename),
      this.destinationPath(this.options.output),
      {
        year: this.options.year,
        author: author,
        work: this.options.work
      }
    );
  },

  install: function () {
  }
});

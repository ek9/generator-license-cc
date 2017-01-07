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
  {name: 'CC BY-NC-ND Attribution-NonCommercial-NoDerivs 4.0 License', value: 'CC-BY-NC-ND-4.0'}
];

module.exports = Generator.extend({

  _callPrompts: function (prompts) {
    return this.prompt(prompts).then(function (props) {
      // To access props later use this.props.someAnswer;
      this.props = props;
    }.bind(this));
  },

  constructor: function () {
    Generator.apply(this, arguments);

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
      type: Number,
      desc: 'Year(s) to include on the license (e.g. 2016-2017)',
      required: true,
      defaults: (new Date()).getFullYear()
    });

    this.option('license', {
      type: String,
      desc: 'License to Generate: CC-BY-4.0, CC-BY-SA-4.0, CC-BY-ND-4.0, CC-BY-NC-4.0, CC-BY-NC-SA-4.0, CC-BY-NC-ND-4.0',
      required: true
    });

    this.option('output', {
      type: String,
      desc: 'Output File',
      default: 'LICENSE',
      required: false
    });
  },

  initializing: function () {
    // init git config
    this.gitc = gitConfig.sync();
    // get name via argument or from git
    this.options.name = this.options.name || this.gitc.user.name || null;
    this.options.work = this.options.work || null;

    if (this.options.email !== undefined || this.options.website !== undefined) {
      // only try to set email if any of contact data passed by options
      // as it must be skippable otherwise
      this.options.email = this.options.email || this.gitc.user.email || null;
    }

    // Have Yeoman greet the user.
    this.log(yosay(
      'Generate Creative Commons LICENSE with ' +
        chalk.red('license-cc') + ' generator!'
    ));
  },

  prompting: {
    nameAndTitlePrompt() {
      var prompts = [
        {
          name: 'name',
          message: 'Author\'s Name:',
          default: this.options.name,
          when: this._initOptions.name === undefined
        },
        {
          name: 'work',
          message: 'Licensed Work Title:',
          default: this.options.name,
          when: this._initOptions.name === undefined
        }

      ];

      return this._callPrompts(prompts);
    },
    contactConfirmPrompt() {
      var prompts = [
        {
          type: 'confirm',
          name: 'contactDetails',
          message: 'Would you like to add contact details?',
          default: true,
          when: this.options.email === undefined && this.options.website === undefined
        }
      ];

      return this._callPrompts(prompts);
    },
    contactPrompt() {
      var prompts = [
        {
          name: 'email',
          message: 'Author\'s Email:',
          default: this.options.email,
          when: this.props.contactDetails === true && this.options.email === undefined
        },
        {
          name: 'website',
          message: 'Author\'s Website:',
          default: this.options.website,
          when: this.props.contactDetails === true && this.options.website === undefined
        }
      ];

      return this._callPrompts(prompts);
    },

    licensePrompt() {
      var prompts = [
        {
          type: 'list',
          name: 'license',
          message: 'Choose a Creative Commons License:',
          default: this.options.license,
          choices: licenses,
          when: this._initOptions.license === '' || this._initOptions.license === undefined
        },
        {
          name: 'output',
          message: 'Output file:',
          default: 'LICENSE',
          when: this._initOptions.output === '' || this._initOptions.output === undefined
        }

      ];

      return this._callPrompts(prompts);
    }
  },

  writing: function () {
    // init all options to props
    this.props.name = this.options.name || this.props.name;
    this.props.license = this.options.license || this.props.license;
    this.props.output = this.options.output || this.props.output;
    if (this.props.contactDetails === true || this.props.contactDetails === undefined) {
      this.props.email = this.props.email || this.options.email || '';
      this.props.website = this.props.website || this.options.website || '';
    }

    // check license file
    var filename = this.props.license + '.txt';

    if (!this.fs.exists(this.templatePath(filename))) {
      throw new Error('License \'' + filename + '\' NOT FOUND!');
    }

    // combine author data
    let author = this.props.name.trim();
    if (this.props.email) {
      author += ' <' + this.props.email.trim() + '>';
    }
    if (this.props.website) {
      author += ' (' + this.props.website.trim() + ')';
    }

    this.fs.copyTpl(
      this.templatePath(filename),
      this.destinationPath(this.props.output),
      {
        year: this.options.year,
        author: author,
        work: 'work'
      }
    );

    // package
    if (!this.fs.exists(this.destinationPath('package.json'))) {
      return;
    }

    const pkg = this.fs.readJSON(this.destinationPath('package.json'), {});
    pkg.license = this.props.license;

    // We don't want users to publish their module to NPM if they copyrighted
    // their content.
    if (this.props.license === 'nolicense') {
      delete pkg.license;
      pkg.private = true;
    }

    this.fs.writeJSON(this.destinationPath('package.json'), pkg);
  },

  install: function () {
    this.installDependencies();
  }
});

'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');


var IsgadgetGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = require('../package.json');

    this.on('end', function () {
      if (!this.options['skip-install']) {
        this.installDependencies();
      }
    });
  },

  askFor: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay('Welcome to the marvelous isgadget generator!'));

    var prompts = [
    {
      name: 'gadgetName',
      message: 'What is gadget name?',
      default: 'gadget'
    }];

    this.prompt(prompts, function (props) {
      this.gadgetName = props.gadgetName;
      done();
    }.bind(this));
  },

  app: function () {
    this.mkdir('app');
    this.mkdir('app/scripts');
    this.mkdir('app/styles');
    this.mkdir('app/resources');
    this.mkdir('app/images');

    this.template('_package.json', 'package.json');
    this.copy('_bower.json', 'bower.json');

    this.template('gadget.xml','app/'+this.gadgetName+'.xml');
    this.copy('scripts/main.js', 'app/scripts/main.js');
    this.copy('styles/main.css', 'app/styles/main.css');
    this.template('resources/ALL_ALL.xml', 'app/resources/ALL_ALL.xml');
    this.template('resources/ALL_ALL.xml', 'app/resources/ja_ALL.xml');
    this.copy('images/gadgeticon-16.ico', 'app/images/gadgeticon-16.ico');
  },

  projectfiles: function () {
    this.copy('editorconfig', '.editorconfig');
    this.copy('jshintrc', '.jshintrc');
  }
});

module.exports = IsgadgetGenerator;

'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var util=require('util');
var exec=require('child_process').exec;

var EasyProjectGenerator = yeoman.generators.Base.extend({
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

    // have Yeoman greet the user
    this.log(this.yeoman);

    // replace it with a short and sweet description of your generator
    this.log(chalk.magenta('You\'re using the fantastic BasicWebapp generator.'));

    var prompts = [{
      type: 'confirm',
      name: 'bootstrap',
      message: 'Would you like to use SASS Bootstrap?',
      default: true
    }];

    this.prompt(prompts, function (props) {
      var newPrompts = [];

      this.bootstrap = props.bootstrap;


    }.bind(this));
  },

  app: function () {
    this.mkdir('dev');
    this.mkdir('dev/assets');
    this.mkdir('dev/assets/sass');
    this.mkdir('dev/assets/js');
    this.mkdir('dev/assets/img');
    this.mkdir('dev/assets/icon');
    this.mkdir('dist');

    this.copy('_package.json', 'package.json');
    this.copy('_Gruntfile.js', 'Gruntfile.js');


    //Copy basic HTML file
    this.copy('index.html', 'index.html');


    //Copy core SASS files
    this.copy('sass/_partials/_variables.scss', 'sass/_partials/_variables.scss');
    this.copy('sass/_partials/_typography.scss', 'sass/_partials/_typography.scss');

    if(this.bootstrap){
      this.copy('_bower_bootstrap.json','../bower.json');
      this.copy('sass/bootstrap.scss', 'sass/main.scss');
    }
    
  },

  projectfiles: function () {
    this.copy('jshintrc', '.jshintrc');
  }
});

module.exports = EasyProjectGenerator;

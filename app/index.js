'use strict';
var util    = require('util');
var path    = require('path');
var chalk   = require('chalk');
var yeoman  = require('yeoman-generator');
var util    = require('util');

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
    this.log(chalk.magenta('You\'re using the fantastic Web Project generator.'));

    var prompts = [{
      type: 'list',
      name: 'framework',
      message: 'Select framework for your project (jQuery + jQuery.html5loader + Modernizr + Velocity.js + webfontLoader)?',
      choices: [{
        name: 'Bootstrap',
        value: 'Bootstrap'
      },{
        name: 'Unsemantic',
        value: 'Unsemantic'
      }]
    }];

    this.prompt(prompts, function(answers) {
      
      this.framework = answers.framework;

      console.log(this.includeBootstrap);

      done();
      
    }.bind(this));
  },
  app: function () {
    this.mkdir('www/assets');
    this.mkdir('www/assets/css');
    this.mkdir('www/assets/sass');
    this.mkdir('www/assets/sass/_partials');
    this.mkdir('www/assets/font');
    this.mkdir('www/ita');
    this.mkdir('www/ita/include');
    this.mkdir('www/assets/js');
    this.mkdir('www/assets/img');
    this.mkdir('www/assets/icon');

    this.copy('_package.json', 'package.json');
    this.copy('_Gruntfile.js', 'Gruntfile.js');


    //Copy basic HTML file
    this.copy('index.php', 'www/ita/index.php');
    this.copy('sass/style.scss', 'www/assets/sass/style.scss');


    if(this.framework === 'Bootstrap'){
      this.copy('_bower_bootstrap.json','bower.json');
      this.copy('sass/bootstrap.scss', 'www/assets/sass/main.scss');
    }
    
    if(this.framework === 'Unsemantic'){
      this.copy('_bower_unsemantic.json','bower.json');
      this.copy('sass/unsemantic.scss', 'www/assets/sass/main.scss');
    }

    
    
  },

  projectfiles: function () {
    this.copy('jshintrc', '.jshintrc');
  }
});

module.exports = EasyProjectGenerator;

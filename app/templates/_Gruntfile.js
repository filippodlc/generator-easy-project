module.exports = function(grunt) {
 
    // Configurazione del progetto.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        meta: {
        config: {
            assets: 'www/assets/'
        },
          banner: ' // INFO Document                                            \n' +
                  ' // AUTORE ------ Colombo 3000                               \n' +
                  ' // SITO: ------- www.colombo3000.com                        \n' +
                  ' // VERSION: ---- <%= pkg.version %>                         \n' +
                  ' // DEVELOPER: -- @filippodlc                                \n' +
                  ' // START ------- <%= pkg.startDate %>                       \n' +
                  ' // LAST MOD ---- <%= grunt.template.today("dd/mm/yyyy") %>  \n' +
                  ' // CLIENTE ----- <%= pkg.name %>                            \n' +
                  ' // FRAMEWORK --- <%= pkg.framework %>                       \n' +
                  ' // INFO Document                                            \n'
        },
        sass: {                              
          dist: {                            
            options: {                       
              style: 'compressed'
            },
            files: {                         
              '<%= config.assets %>css/style.css': '<%= config.assets %>sass/style.scss'
            }
          }
        },
        cssmin: {
          add_banner: {
            options: {
              banner: '<%= meta.banner %>'
            },
            files: {
              '<%= config.assets %>css/style-min.css': ['<%= config.assets %>css/reset.css', 
                                                        '<%= config.assets %>css/unsemantic.css', 
                                                        '<%= config.assets %>css/font-awesome.min.css', 
                                                        '<%= config.assets %>css/magnific-popup.css', 
                                                        '<%= config.assets %>css/style.css']
            }
          }
        },
        watch: {
          scripts: {
            files: ['<%= config.assets %>sass/*.scss', '<%= config.assets %>js/*.js'],
            tasks: ['dev'],
            options: {
              spawn: false
            }
          }
        },
        concat: {
          options: {
            separator: ';',
          },
          js: {
            src: ['bower_components/jquery/dist/jquery.min.js', 
                  'bower_components/jquery.html5loader/src/jquery.html5loader.min.js', 
                  'bower_components/mondernizr/mondernizr-min.js', 
                  'bower_components/velocity/jquery.velocity.min.js', 
                  'bower_components/velocity/velocity.ui.min.js', 
                  'bower_components/webfont/js/index.js'],
            dest: '<%= config.assets %>js/vendor.js',
          }
        },
        imagemin: {                          
          dynamic: {                         
            files: [{
              expand: true,                  
              cwd: '<%= config.assets %>img/',                   
              src: ['**/*.{png,jpg,gif}'],   
              dest: '<%= config.assets %>img/'
            }]
          }
        },
        uglify: {
          app: {
            options: {
              banner: '<%= meta.banner %>'
            },
            files: {
              '<%= config.assets %>js/app-min.js': ['<%= config.assets %>js/app.js']
            }
          },
          all: {
            files: {
              'bower_components/mondernizr/mondernizr-min.js': ['bower_components/mondernizr/mondernizr.js']
            }
          }
        },
       browserSync: {
          dev: {
              bsFiles: {
                  src : [ '<%= config.assets %>css/*.css',
                          '<%= config.assets %>js/*.js', 
                          '<%= config.assets %>**/*.php', 
                          '<%= config.assets %>**/*.htm', 
                          '<%= config.assets %>**/*.html',
                          '!admin/*' ]
              },
              options: {
                 port: 12345, //PROXY PORT
                 proxy: "", //PROXY LINK
                 watchTask: true
              }
          }
      }

    });
    
    /*LOAD TASK */
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-browser-sync');

    /*CONFIGURAZIONE TASK*/
    grunt.registerTask('image', ['imagemin']);
    grunt.registerTask('dev', ['sass', 'uglify:app']);
    grunt.registerTask('start', ['uglify:all', 'concat:js']);
    grunt.registerTask('default', ['browserSync', 'watch']);
 
};
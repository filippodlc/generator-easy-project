module.exports = function(grunt) {
 
    // Configurazione del progetto.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        meta: {
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
        cssmin: {
          add_banner: {
            options: {
              banner: '<%= meta.banner %>'
            },
            files: {
              'css/style-min.css': ['css/reset.css', 'css/unsemantic.css', 'css/font-awesome.min.css', 'css/magnific-popup.css', 'css/style.css']
            }
          }
        },
        watch: {
          scripts: {
            files: ['css/*.css', 'js/*.js'],
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
            src: ['js/jquery.min.js', 'js/jquery.html5Loader.min.js', 'js/modernizr.js', 'js/jquery-inview-min.js', 'js/jquery.velocity.min.js', 'js/velocity-ui-min.js', 'js/jquery.magnific-popup.min.js', 'js/webfont-min.js'],
            dest: 'js/vendor-min.js',
          }
        },
        imagemin: {                          
          dynamic: {                         
            files: [{
              expand: true,                  
              cwd: 'img/',                   
              src: ['**/*.{png,jpg,gif}'],   
              dest: 'img/'
            }]
          }
        },
        uglify: {
          app: {
            options: {
              banner: '<%= meta.banner %>'
            },
            files: {
              'js/app-min.js': ['js/app.js']
            }
          },
          all: {
            files: {
              'js/cookie-min.js': ['js/cookie.js'],
              'js/jquery-inview-min.js': ['js/jquery.inview.js'],
              'js/velocity-ui-min.js': ['js/velocity.ui.min.js'],
              'js/webfont-min.js': ['js/webfont-1-5-6.js']
            }
          }
        },
       browserSync: {
          dev: {
              bsFiles: {
                  src : ['css/*.css','**/*.php', 'js/*.js' ]
              },
              options: {
                 port: 50000,
                 proxy: "http://199.6.54.10/GRAFICA/metalpress_2014/ita/",
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
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-contrib-imagemin');

    /*CONFIGURAZIONE TASK*/
    grunt.registerTask('image', ['imagemin']);
    grunt.registerTask('dev', ['cssmin', 'uglify:app']);
    grunt.registerTask('start', ['concat:js', 'uglify:all']);
    grunt.registerTask('default', ['browserSync', 'watch']);
 
};


module.exports = function (grunt) {
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        uglify: {
            build: {
                files: {
                    
                }
            }
        },
        compass: {
            dev: {
                options: {
                    sassDir: 'sass',
                    cssDir: 'css',
                    imagesDir: 'images',
                    environment: 'development',
                    httpGeneratedImagesPath: 'images'
                }
            },
            live: {
                options: {
                    sassDir: 'sass',
                    cssDir: 'css',
                    imagesDir: 'images',
                    environment: 'production',
                    httpGeneratedImagesPath: 'images'
                }
            }
        },

        watch: {
            jshint: {
                files: ['scripts/main.js'],
                tasks: ['jshint']
            },
            compass: {
                files: ['sass/{,*/}*{,*/}*{,*/}*.{scss,sass}'],
                tasks: ['compass:dev', 'notify:compass'],
                options: {
                    livereload: true,
                }
            }
        },

        jshint: {
            all: ['scripts/main.js']
        },

        clean: {
            // Clean any pre-commit hooks in .git/hooks directory
            precommit: ['.git/hooks/pre-commit'],
            pull: ['.git/hooks/post-merge']
        },

        shell: {
            precommit: {
                command: 'cp git-hooks/pre-commit .git/hooks/'
            },
            pull: {
                command: 'cp git-hooks/post-merge .git/hooks/'
            }
        },

        notify: {
            compass: {
              options: {
                message: 'Compass compiled', //required
              }
            }
        }


    });


    // Required task(s)
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-notify');

    // Default task(s)
    grunt.registerTask('default', ['compass:dev']);
    grunt.registerTask('setup', ['clean:precommit','shell:precommit','clean:pull','shell:pull']);
    grunt.registerTask('live', ['jshint', 'uglify', 'compass:live']);
};
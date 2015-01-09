module.exports = function(grunt) {
 
    // Configurazione del progetto.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        config: {
            dev: 'dev/',
            pub: 'www/',
            assets: 'assets/',
        },
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
        sass: {                              
          dist: {                            
            options: {                       
              style: 'compressed',
              banner: '<%= meta.banner %>'
            },
            files: {                         
              '<%= config.dev %><%= config.assets %>css/style.css': '<%= config.dev %><%= config.assets %>sass/style.scss'
            }
          }
        },
        watch: {
          scripts: {
            files: ['<%= config.dev %><%= config.assets %>sass/*.scss', '<%= config.dev %><%= config.assets %>js/*.js'],
            tasks: ['sass', 'uglify:app'],
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
                  //'bower_components/jquery.html5loader/src/jquery.html5loader.min.js', 
                  'bower_components/modernizr/modernizr-min.js', 
                  'bower_components/velocity/velocity.min.js', 
                  'bower_components/velocity/velocity.ui.min.js', 
                  'bower_components/webfont/js/index.js'],
            dest: '<%= config.dev %><%= config.assets %>js/vendor.js',
          }
        },
        imagemin: {                          
          dynamic: {                         
            files: [{
              expand: true,                  
              cwd: '<%= config.dev %><%= config.assets %>img/',                   
              src: ['**/*.{png,jpg,gif,svg}'],   
              dest: '<%= config.dev %><%= config.assets %>__img/'
            }]
          }
        },
        uglify: {
          app: {
            options: {
              banner: '<%= meta.banner %>'
            },
            files: {
              '<%= config.dev %><%= config.assets %>js/app-min.js': ['<%= config.dev %><%= config.assets %>js/app.js']
            }
          },
          all: {
            files: {
              'bower_components/modernizr/modernizr-min.js': ['bower_components/modernizr/modernizr.js']
            }
          }
        },
        copy: {
            main: {
              src: ['**','!**/<%= config.assets %>/img/**', '!**/<%= config.assets %>/__img/**', '!**/<%= config.assets %>/sass/**'],
              expand: true,
              cwd: '<%= config.dev %>',
              dest: '<%= config.pub %>'
            },
            image:{
              src: ['**'],
              expand: true,
              cwd: '<%= config.dev %><%= config.assets %>__img',
              dest: '<%= config.pub %><%= config.assets %>img/'
            }
        },
       browserSync: {
          dev: {
              bsFiles: {
                  src : [ '<%= config.dev %><%= config.assets %>css/*.css',
                          '<%= config.dev %><%= config.assets %>js/*.js', 
                          '<%= config.dev %><%= config.assets %>**/*.php', 
                          '<%= config.dev %><%= config.assets %>**/*.htm', 
                          '<%= config.dev %><%= config.assets %>**/*.html',
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
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-browser-sync');

    /*CONFIGURAZIONE TASK*/
    grunt.registerTask('pub', ['imagemin', 'copy:main', 'copy:image']);
    grunt.registerTask('start', ['uglify:all', 'concat:js']);
    grunt.registerTask('default', ['browserSync', 'watch']);
 
};
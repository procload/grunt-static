module.exports = function(grunt) {

  // 1. All configuration goes here
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    assemble: {
      options: {
        assets: 'assets',
        plugins: ['permalinks'],
        partials: ['includes/**/*.hbs'],
        layout: ['layouts/default.hbs'],
        data: ['data/*.{json,yml}']
      },
      pages: {
        src: ['**/*.hbs'],
        dest: 'build/'
      }
    },

    concat: {
      dist: {
        src: [
          'javascripts/libs/*.js', // All JS in the libs folder
          'javascripts/public/*.js'  // This specific file
        ],
        dest: 'build/javascripts/production.js',
      }
    },

    uglify: {
      build: {
        src: 'build/javascripts/production.js',
        dest: 'build/javascripts/production.min.js'
      }
    },

    imagemin: {
      dynamic: {
        files: [{
          expand: true,
          cwd: 'images/',
          src: ['**/*.{png,jpg,gif}'],
          dest: 'build/images'
        }]
      }
    },

    sass: {                              // Task
      dist: {                            // Target
        options: {                       // Target options
          style: 'compressed',
          require: 'susy'
        },
        files: {                         // Dictionary of files
          'build/stylesheets/application.css' : 'stylesheets/**/*.scss'
        }
      },
      dev: {
        options: {                       // Target options
          require: 'susy'
        },
        files: {                         // Dictionary of files
          'build/stylesheets/application.css' : 'stylesheets/**/*.scss'
        }
      }

    },

    autoprefixer: {
      no_dest: {
       src: 'build/stylesheets/application.css'
      }
    },

    connect: {
      server: {
        options: {
          port: 9001,
          base: 'build'
        }
      }
    },


    watch: {
      scripts: {
        files: ['javascripts/*.js'],
        tasks: ['concat', 'uglify'],
        options: {
          livereload: true,
        },
      },

      css: {
        files: ['stylesheets/**/*.scss'],
        tasks: ['sass:dev', 'autoprefixer'],
        options: {
          livereload: true,
        },
      }
    }
  });

  // 3. Where we tell Grunt we plan to use this plug-in.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('assemble');

  // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
  grunt.registerTask('default', ['connect', 'watch']);

  grunt.registerTask('build', ['concat','uglify','sass:dist','autoprefixer','imagemin']);
};

// Generated on <%= (new Date).toISOString().split('T')[0] %> using <%= pkg.name %> <%= pkg.version %>
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // Configurable paths
    var config = {
        app: require('./bower.json').appPath || 'app',
        dist: 'dist',
        package: 'package'
    };

    grunt.initConfig({

        // Project settings
        config: config,

        // Watches files for changes and runs tasks based on the changed files
        watch: {
            bower: {
                files: ['bower.json'],
                tasks: ['bowerInstall']
            },
            js: {
                files: ['<%%= config.app %>/scripts/{,*/}*.js'],
                tasks: ['newer:jshint:all']
            },
            jsTest: {
                files: ['test/spec/{,*/}*.js'],
                tasks: ['newer:jshint:test', 'karma']
            },
            gruntfile: {
                files: ['Gruntfile.js']
            },
            styles: {
                files: ['<%%= config.app %>/styles/{,*/}*.css'],
                tasks: ['newer:copy:styles', 'autoprefixer']
            }
        },

        // Empties folders to start fresh
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%%= config.dist %>/*',
                        '!<%%= config.dist %>/.git*'
                    ]
                }]
            }
        },

        // Add vendor prefixed styles
        autoprefixer: {
            options: {
                browsers: ['last 1 version']
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '.tmp/styles/',
                    src: '{,*/}*.css',
                    dest: '.tmp/styles/'
                }]
            }
        },

        // Make sure code styles are up to par and there are no obvious mistakes
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: {
                src: [
                    'Gruntfile.js',
                    '<%%= config.app %>/scripts/{,*/}*.js'
                ]
            },
            test: {
                options: {
                    jshintrc: 'test/.jshintrc'
                },
                src: ['test/spec/{,*/}*.js']
            }
        },

        // Automatically inject Bower components into the HTML file
        wiredep: {
            options: {
                cwd: '<%%= config.app %>'
            },
            app: {
                src: ['<%%= config.app %>/<%= appname %>.xml'],
                ignorePath:  /..\//
            }
        },

        // Renames files for browser caching purposes
        filerev: {
            dist: {
                src: [
                    '<%%= config.dist %>/scripts/{,*/}*.js',
                    '<%%= config.dist %>/styles/{,*/}*.css',
                    '<%%= config.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
                ]
            }
        },

        // Reads HTML for usemin blocks to enable smart builds that automatically
        // concat, minify and revision files. Creates configurations in memory so
        // additional tasks can operate on them
        useminPrepare: {
          html: '<%%= config.app %>/<%= appname %>.xml',
          options: {
            dest: '<%%= config.dist %>',
            flow: {
              html: {
                steps: {
                  js: ['concat', 'uglifyjs'],
                  css: ['cssmin']
                },
                post: {}
              }
            }
          }
        },

        // Performs rewrites based on rev and the useminPrepare configuration
        usemin: {
            html: ['<%%= config.dist %>/{,*/}*.xml'],
            css: ['<%%= config.dist %>/styles/{,*/}*.css'],
            options: {
                assetsDirs: ['<%%= config.dist %>','<%%= config.dist %>/images']
            }
        },

        // The following *-min tasks produce minifies files in the dist folder
        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%%= config.app %>/images',
                    src: '{,*/}*.{gif,jpeg,jpg,png}',
                    dest: '<%%= config.dist %>/images'
                }]
            }
        },

        svgmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%%= config.app %>/images',
                    src: '{,*/}*.svg',
                    dest: '<%%= config.dist %>/images'
                }]
            }
        },

        // Copies remaining files to places other tasks can use
        copy: {
            dist: {
                files: [{
                expand: true,
                dot: true,
                cwd: '<%%= config.app %>',
                dest: '<%%= config.dist %>',
                src: [
                    '*.{ico,png,txt}',
                    'images/{,*/}*.{webp}',
                    'fonts/*',
                    'resources/*',
                    '*.xml'
                ]
            }, {
                expand: true,
                cwd: '.tmp/images',
                dest: '<%%= config.dist %>/images',
                src: ['generated/*']
            }, {
                expand: true,
                cwd: 'bower_components/bootstrap/dist',
                src: 'fonts/*',
                dest: '<%%= config.dist %>'
            }, {
                expand: true,
                cwd: 'bower_components/font-awesome-bower',
                src: 'fonts/*',
                dest: '<%%= config.dist %>'
            }]
            },
            styles: {
                expand: true,
                cwd: '<%%= config.app %>/styles',
                dest: '.tmp/styles/',
                src: '{,*/}*.css'
            }
        },

        // Run some tasks in parallel to speed up build process
        concurrent: {
            test: [
                'copy:styles'
            ],
            dist: [
                'copy:styles',
                'imagemin',
                'svgmin'
            ]
        },

        // Replace source path
        replace: {
            js: {
                src: ['<%%= config.dist %>/<%= appname %>.xml'],
                overwrite: true,
                replacements: [{
                    from: 'src=\"scripts/',
                    to: 'src=\"__IS_GADGET_BASE_URL__/scripts/'
                }]
            },
            css: {
                src: ['dist/sample.xml'],
                overwrite: true,
                replacements: [{
                    from: 'href=\"styles/',
                    to: 'href=\"__IS_GADGET_BASE_URL__/styles/'
                }]
            },
            img: {
                src: ['dist/sample.xml'],
                overwrite: true,
                replacements: [{
                    from: 'images/gadgeticon-16.ico',
                    to: '__IS_GADGET_BASE_URL__/images/gadgeticon-16.ico'
                }]

            }
        },

        // Compres dist files to package
        compress: {
            dist: {
                options: {
                    archive: '<%%= config.package %>/<%= appname %>.zip'
                },
                files: [{
                    expand: true,
                    cwd: 'dist/',
                    src: ['**'],
                    dest: ''
                }]
            }
        },

        // Test settings
        karma: {
          unit: {
            configFile: 'test/karma.conf.js',
            singleRun: true
          }
        }
    });

    grunt.registerTask('test', [
        'clean:dist',
        'concurrent:test',
        'autoprefixer',
        'karma'
    ]);

    grunt.registerTask('build', [
        'clean:dist',
        'wiredep',
        'useminPrepare',
        'concurrent:dist',
        'autoprefixer',
        'concat',
        'copy:dist',
        'cssmin',
        'uglify',
        'filerev',
        'usemin',
    ]);

    grunt.registerTask('upload', [
        'default',
        'replace',
        'compress'
    ]);

    grunt.registerTask('dist', [
        'default',
        'compress'
    ]);

    grunt.registerTask('default', [
        'newer:jshint:all',
        'test',
        'build',
    ]);
};
'use strict';

var PORT = 9000, // 8080
    LIVE_RELOAD_PORT = 1337; // 35729 default

module.exports = function (grunt) {

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    var config = require('./config.json');

    grunt.initConfig({

        // Project settings
        yeoman: {
            // configurable paths
            app: require('./bower.json').appPath || 'app',
            dist: 'dist'
        },
        // Express Config
        express: {
            options: {
                port: process.env.PORT || 9000
            },
            dev: {
                options: {
                    script: 'server.js',
                    debug: true
                }
            },
            prod: {
                options: {
                    script: '<%= yeoman.dist %>/server.js',
                    node_env: 'production'
                }
            }
        },
        // Watch Config
        watch: {
            js: {
		files: ['<%= yeoman.app %>/scripts/{,*/}*.js'],
		tasks: ['newer:jshint:all'],
		options: {
		  livereload: LIVE_RELOAD_PORT
		}
	    },
	    mochaTest: {
		files: ['test/server/{,*/}*.js'],
		tasks: ['mochaTest']
	    },
	    jsTest: {
		files: ['test/client/spec/{,*/}*.js'],
		tasks: ['newer:jshint:test', 'karma']
	    },
	    css: {
                files: ['<%= yeoman.app %>/styles/**/*.css']
            },
            stylus: {
                files: ['<%= yeoman.app %>/styles/**/*.styl'],
                tasks: ['stylus','copy:styles:server']
            },
            images: {
                files: [
                    '<%= yeoman.app %>/images/**/*.{png,jpg,jpeg,webp}'
                ]
            },
	    livereload: {
		files: [
		  '<%= yeoman.app %>/views/{,*//*}*.{html,jade}',
		  '{.tmp,<%= yeoman.app %>}/styles/{,*/}*.css',
		  '{.tmp,<%= yeoman.app %>}/scripts/{,*//*}*.js',
		  '<%= yeoman.app %>/images/{,*//*}*.{png,jpg,jpeg,gif,webp,svg}'
		],
	      
		options: {
		  livereload: LIVE_RELOAD_PORT
		}
	    },
            express: {
		files: [
		  'server.js',
		  'lib/**/*.{js,json}',
		  '!**/node_modules/**',
		  '!Gruntfile.js'
		],
		tasks: ['newer:jshint:server', 'express:dev', 'wait'],
		options: {
		  livereload: LIVE_RELOAD_PORT,
		  nospawn: true //Without this option specified express won't be reloaded
		}
     	    }
        },

        // Clean Config
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%= yeoman.dist %>/*',
                        '!<%= yeoman.dist %>/.git*',
            		'!<%= yeoman.dist %>/Procfile'
                    ]
                }]
            },
            server: '.tmp'
        },

        // Automatically inject Bower components into the app
        bowerInstall: {
            target: {
                src: [
                    'app/views/**/*.html',   // .html support...
                    'app/views/**/*.ejs'     // .ejs support...
                ],
                cwd: '',
                dependencies: true,
                devDependencies: false,
                exclude: [],
                fileTypes: {},
                ignorePath: '<%= yeoman.app %>/',
                overrides: {}
            }
        },

        // Hint Config
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: [
                '<%= yeoman.app %>/scripts/{,*/}*.js'
            ]
        },

        // Stylus Config
        stylus: {
            compile: {
                options: {
                    paths: ['<%= yeoman.app %>/styles/**/*.styl'],
                    use: [
                        require('fluidity'), // use stylus plugin at compile time
                        require('nib')
                    ],
                    import: [
                        'nib',
                        '../colors',
                        '../function'
                    ]
                },
                files: {
                    '.tmp/styles/app.css':['<%= yeoman.app %>/styles/app.styl']
                }
            }
        },

        // Renames files for browser caching purposes
        rev: {
            dist: {
                files: {
                    src: [
                        '<%= yeoman.dist %>/scripts/**/*.js',
                        '<%= yeoman.dist %>/styles/**/*.css',
                        '<%= yeoman.dist %>/images/**/*.{png,jpg,jpeg,gif,webp}',
                        '<%= yeoman.dist %>/styles/fonts/**/*.*'
                    ]
                }
            }
        },

        // Usemin Config
        useminPrepare: {
            options: {
                dest: '<%= yeoman.dist %>'
            },
            html: [
                '<%= yeoman.app %>/{,*/}*.html'
            ]
        },
        usemin: {
            options: {
                dirs: ['<%= yeoman.dist %>'],
                basedir: '<%= yeoman.dist %>',
                assetsDirs: ['<%= yeoman.dist %>', '<%= yeoman.dist %>/images']
            },
            html: ['<%= yeoman.dist %>/{,*/}*.html'],
            css: ['<%= yeoman.dist %>/styles/{,*/}*.css']
        },

        // Imagemin Config
        imagemin: {
	        dist: {
                files: [{
                  expand: true,
                  cwd: '<%= yeoman.app %>/images',
                  src: [
                      '{,*/,*/*/}*.{png,jpg,jpeg,gif}',
                      '!/favicons/**/*'
                  ],
                  dest: '<%= yeoman.dist %>/images'
                }],
                options: {
                  cache: false
                }
            }
        },

        // SVGmin Config
        svgmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>/images',
                    src: '{,*/}*.svg',
                    dest: '<%= yeoman.dist %>/images'
                }]
            }
        },

        // HTML Config
        htmlmin: {
            dist: {
                options: {},
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>/views',
                    src: '*.html',
                    dest: '<%= yeoman.dist %>'
                }]
            }
        },

        'json-minify': {
            build: {
                files: '<%= yeoman.dist %>/**/*.json'
            }
        },

        // Copy Config
        // Put files not handled in other tasks here
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= yeoman.app %>',
                    dest: '<%= yeoman.dist %>',
                    src: [
                        '.htaccess',
                        '*.{ico,png,txt}',
                        'images/{,*/}*.{webp}',
                        //'bower_components/**/license*',
                        //'bower_components/**/LICENSE*',
                        //'bower_components/fonts/**/*',
                        'styles/pure/**/*',
                        'doc/**/*',
                        'fonts/**/*',
                        'md/**/*',
                        '.git/**/*',
                        '.gitignore',
                        'README.md',
                        'CNAME'
                    ]
                }, {
                    expand: true,
                    dot: true,
                    cwd: '<%= yeoman.app %>/views',
                    dest: '<%= yeoman.dist %>',
                    src: [
                        '**/*.html',
                        '**/*.ejs'
                    ]
                }, {
                    expand: true,
                    cwd: '.tmp/images',
                    dest: '<%= yeoman.dist %>/images',
                    src: ['generated/*']
                }, {
                    expand: true,
                    dest: '<%= yeoman.dist %>',
                    src: [
                        'config.json',
                        'package.json',
                        'bower.json',
                        'server.js',
                        'lib/**/*'
                    ]
                }]
            },
            styles: {
                expand: true,
                cwd: '.tmp/styles/',
                dest: '<%= yeoman.app %>/styles',
                src: '{,*/}*.css'
            }
        },

        // Concurrent Config
        concurrent: {
            server: [
                'stylus'
            ],
            test: [
                'stylus'
            ],
            dist: [
                'stylus',
                'svgmin',
                'htmlmin'
            ]
        },

        // Test settings
        karma: {
            unit: {
                configFile: 'test/karma.conf.js',
                singleRun: true
            }
        },

        mochaTest: {
            options: {
                reporter: 'spec'
            },
            src: ['test/server/**/*.js']
        },

        env: {
            test: {
                NODE_ENV: 'test'
            }
        }
    });

    // Used for delaying livereload until after server has restarted
    grunt.registerTask('wait', function () {
        grunt.log.ok('Waiting for server reload...');

        var done = this.async();

        setTimeout(function () {
            grunt.log.writeln('Done waiting!');
            done();
        }, 500);
    });

    grunt.registerTask('express-keepalive', 'Keep grunt running', function() {
        this.async();
    });

    grunt.registerTask('serve', function (target) {
        if (target === 'dist') {
            grunt.log.warn('The `dist` target has been removed with static site. Use `grunt serve` to start a server local or `grunt build:dist` to generate distribution');
            grunt.log.warn('Run `grunt build:dist`');
            return grunt.task.run(['build:dist']);
        }

        grunt.task.run([
            'clean:server',
            'bowerInstall',
            'concurrent:server',
            'copy:styles',
            'express:dev',
            'watch'
        ]);
    });

    grunt.registerTask('server', function () {
        grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
        grunt.task.run(['serve']);
    });

    // Build
    grunt.registerTask('build', 'Build production .js and .css files.', [
        'clean:dist',
        'bowerInstall',
        'concurrent:dist',
        'copy:styles',
        'useminPrepare',
        'imagemin',
        'concat',
        'cssmin',
        'uglify',
        'copy:dist',
        'rev',
        'usemin',
        'json-minify'
    ]);

    grunt.registerTask('default', [
        'newer:jshint',
        'test',
        'build'
    ]);
};

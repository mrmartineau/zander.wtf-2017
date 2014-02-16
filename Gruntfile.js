module.exports = function (grunt) {

	'use strict';

	// == JS files
	var compileTemplatesList = [
		'js/plugins.js',
		'js/libs/handlebars.js',
		'bower_components/domready/ready.js',
		'bower_components/reqwest/reqwest.js',
		'js/compileTemplates.js'
	];
	var siteJSList = [
		'js/plugins.js',
		'bower_components/domready/ready.js',
		'js/script.js'
	];
	var jsFile = 'script.min.js';
	// ====================

	// =====================
	var distDir = 'js/compiled/';

	// ====================

	// Project configuration.
	grunt.initConfig({
		pkg: require('./package'),

		jshint: {
			all: siteJSList,
			options: {
				jshintrc: '.jshintrc'
			}
		},

		// Choose Sass files below
		sass: {
			dev: {
				options: {
					unixNewlines: true,
					style: 'compressed',
					lineNumbers: false,
					debugInfo : false
				},
				files: {
					'css/kickoff.css': 'scss/kickoff.scss'
				}
			},
			deploy: {
				options: {
					style: 'compressed'
				},
				files: {
					'css/kickoff.css': 'scss/kickoff.scss'
				}

			}
		},

		uglify: {
			site : {
				options: {

					mangle: true, // mangle: Turn on or off mangling
					beautify: false, // beautify: beautify your code for debugging/troubleshooting purposes
					compress: true,
					sourceMap: distDir + jsFile + '.map',
					sourceMappingURL: '/' + jsFile +'.map',
				},
				files: {
					'js/compiled/script.min.js' : siteJSList
				}
			},
			handlebars : {
				options: {

					mangle: true, // mangle: Turn on or off mangling
					beautify: true, // beautify: beautify your code for debugging/troubleshooting purposes
					compress: false,

					// sourceMap: @string. The location of the source map, relative to the project
					sourceMap: distDir + 'compileTemplates.min.js.map',

					// sourceMappingURL: @string. The string that is printed to the final file
					sourceMappingURL: 'compileTemplates.min.js.map',

					// sourceMapRoot: @string. The location where your source files can be found. This sets the sourceRoot field in the source map.
					sourceMapRoot: '../../'
				},
				files: {
					'js/compiled/compileTemplates.min.js' : compileTemplatesList
				}
			}
		},

		watch: {
			scss: {
				files: ['scss/**/*.scss'],
				tasks: ['sass:dev', 'copy:css']
			},

			siteJS: {
				files: siteJSList,
				tasks: ['uglify', 'copy:js']
			},

			img: {
				files: [
					'img/**/*.*',
					'fonts/*.*'
				],
				tasks : 'copy:img'
			},

			json : {
				files: '*.json',
				tasks: ['copy:json']
			},

			jekyll: {
				files: [
					'_includes/**/*.html',
					'_layouts/**/*.html',
					'_posts/*.md',
					'_drafts/*.md',
					'config.yml',
					'*.php',
					'**/*.html',
					'*.md',
					'Gruntfile.js'
				],
				tasks: ['jekyll:blog'],
				options: {
					livereload: true
				}
			},

			livereload: {
				option: { livereload: true },
				files : [
					'_site/css/kickoff.css'
				]
			}
		},

		jekyll: {
			server : {
				server : false,
				auto   : false,
				drafts : false,
				future : false
			},
			blog: {
				src: './',
				dest: '_site'
			}
		},


		/**
		 * Connect
		 * https://github.com/gruntjs/grunt-contrib-connect
		 * Start a static web server
		 */
		connect: {
			server: {
				options: {
					open: true,
					livereload: true,
					base: './_site'
				}
			}
		},

		fetchpages: {
			dist: {
				options: {
					urls: [
						// list of remote urls to fetch, local destination file name (localFile) required
						{
							url: 'http://martineau-u.dev/index.html',
							localFile: 'index-1.html'
						}
					],
					// base url for fetching pages via GruntJS files feature
					filesBaseURL: 'http://martineau-u.dev/',
					// local target folder for fetched pages
					target: '_site'
				},
				files: [
					// matching file names are added to "filesBaseURL" for fetching
					{
						src: [
							'**/*.html',
							'!url.html'
						],
						expand: true,
						cwd: '_site'
					}
				]
			}
		},

		copy: {
			dist: {
				files: [
					{ expand: true, cwd: './img', src: ['./**/*.*'], dest: '_site/img' },
					{ expand: true, cwd: './css', src: ['./**/*.*'], dest: '_site/css' },
					{ expand: true, cwd: './js', src: ['./**/*.*'], dest: '_site/js' }
				]
			},
			img : {
				files: [
					{ expand: true, cwd: './img', src: ['./**/*.*'], dest: '_site/img' }
				]
			},
			css : {
				files: {
					'_site/css/kickoff.css': 'css/kickoff.css'
				}
			},
			js: {
				files: [
					{ expand: true, cwd: './js', src: ['./**/*.*'], dest: '_site/js' }
				]
			}
		}
	});

	// Load all the grunt tasks
	require('load-grunt-tasks')(grunt);

	// =============
	// === Tasks ===
	// =============

	// A task for deployment
	grunt.registerTask('deploy', ['jshint', 'uglify', 'sass:deploy']);

	// Default task 2: Same as above but this creates a server and watches the project for changes
	grunt.registerTask('default', ['uglify', 'sass:dev', 'copy']);

	/**
	 * A task for for a static server with a watch
	 * run connect and watch
	 */
	grunt.registerTask("serve", ['sass:dev', 'uglify', "jekyll", "connect", "watch"]);

};

module.exports = function (grunt) {

	'use strict';

	// == JS files
	var jsFileList = [
		'js/plugins.js',
		'js/libs/handlebars.js',
		'js/script.js'
	];
	var jsFile = '_script.min.js';
	// ====================

	// =====================
	var distDir = 'js/_compiled/';

	// ====================

	// Project configuration.
	grunt.initConfig({
		pkg: require('./package'),

		jshint: {
			all: jsFileList,
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
					'css/kickoff.css': 'scss/kickoff.scss',
					'_site/css/kickoff.css': 'scss/kickoff.scss'
				}
			},
			deploy: {
				options: {
					style: 'compressed'
				},
				files: {
					'css/kickoff.css': 'scss/kickoff.scss',
					'_site/css/kickoff.css': 'scss/kickoff.scss'
				}

			}
		},

		uglify: {
			js : {
				options: {
					mangle: true,
					beautify: false,
					compress: true,
					// report: 'gzip',

					// sourceMap: @string. The location of the source map, relative to the project
					sourceMap: 'script.min.js.map',

					// sourceMappingURL: @string. The string that is printed to the final file
					sourceMappingURL: '../../script.min.js.map'
				},
				files: {
					'js/compiled/script.min.js' : jsFileList
				}
			}
		},

		copy: {
			main: {
				files: [
					{
						src: ['js/compiled/script.min.js'],
						dest: '_site/js/compiled/script.min.js'
					},
					{
						src: ['script.min.js.map'],
						dest: '_site/script.min.js.map'
					}
				]
			}
		},

		watch: {
			scss: {
				files: ['scss/**/*.scss'],
				tasks: ['sass:dev', 'copy:main']
			},

			js: {
				files: ['Gruntfile.js','js/*.js','js/libs/**/*.js'],
				tasks: ['uglify', 'copy:main']
			},

			json : {
				files: '*.json',
				tasks: ['jekyll:blog', 'copy:main']
			},

			jekyll: {
				files: ['_includes/*.html', '_layouts/*.html', '_posts/**/*.md', 'config.yml', '*.php'],
				tasks: ['jekyll:blog', 'copy:main']
			},

			livereload: {
				option: {livereload: true},
				files : ['css/kickoff.css', '_site/css/kickoff.css']
			}
		},

		jekyll: {
			server : {
				server : false,
				auto : false
			},
			blog: {
				src: './',
				dest: '_site'
			}
		}
	});

	// Load some stuff
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-jekyll');

	// =============
	// === Tasks ===
	// =============

	// A task for deployment
	grunt.registerTask('deploy', ['jshint', 'uglify', 'sass:deploy']);

	// Default task 2: Same as above but this creates a server and watches the project for changes
	grunt.registerTask('default', ['uglify', 'sass:dev', 'copy']);

};

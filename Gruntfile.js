var path = require('path');
var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;

var folderMount = function folderMount(connect, point) {
	return connect.static(path.resolve(point));
};


module.exports = function (grunt) {

	'use strict';

	// == JS files
	var jsFileList = [
		'js/plugins.js',
		'js/script-jekyll.js'
	];
	var jsFile = '_script.min.js';
	// ====================

	// =====================
	var distDir = 'js/_compiled/';

	// ====================
	// Grunt config
	var config = {
		pkg: require('./package'),
		meta: {
			banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
			'<%= grunt.template.today("yyyy-mm-dd") %> */'
		},

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
					style: 'expanded',
					lineNumbers: true,
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
					'css/kickoff.css': 'scss/kickoffe.scss'
				}

			}
		},

		// Not needed at the moment
		csscss: {
			dist: {
				src: ['css/kickoff.css']
			}
		},

		uglify: {
			js : {
				options: {
					mangle: false,
					// report: 'gzip',

					// sourceMap: @string. The location of the source map, relative to the project
					sourceMap: '_script.min.js.map',

					// sourceMappingURL: @string. The string that is printed to the final file
					sourceMappingURL: '../../_script.min.js.map'
				},
				files: {
					'js/_compiled/_script.min.js' : jsFileList
				}
			}
		},

		clean: {
			deploy: ['dist']
		},

		copy: {
			main: {
				files: [
					{
						src: ['js/_compiled/_script.min.js'],
						dest: '_site/js/_compiled/_script.min.js',
						filter: 'isFile'
					},
					{
						src: ['_script.min.js.map'],
						dest: '_site/_script.min.js.map',
						filter: 'isFile'
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
				files: 'js/**/*.js',
				tasks: ['uglify', 'copy:main']
			},

			json : {
				files: '*.json',
				tasks: ['jekyll:dev', 'copy:main']
			},

			jekyll: {
				files: ['blog/*.html', '_includes/*.html', '_layouts/*.html', '_posts/**/*.md', 'config.yml', '*.php'],
				tasks: ['jekyll:dev', 'copy:main']
			}
		},

		// Server config
		connect: {
			server: {
				options: {
					port: 9001,
					keepalive: true,
					message: 'Server is ready!'
				}
			},
			livereload: {
				options: {
					port: 2001,
					middleware: function(connect, options) {
						return [lrSnippet, folderMount(connect, options.base)];
					}
				}
			}
		},

		livereload: {
			port: 35729 // Default livereload listening port.
		},

		concurrent: {
			target: {
				tasks: ['connect', 'watch'],
				logConcurrentOutput: true,
				message: 'Concurrent change!'
			}
		},

		jekyll: {
			server : {
				src : './',
				dest: '_site',
				server : true,
				server_port : 8000,
				auto : true
			},
			dev: {
				src: './',
				dest: '_site'
			},
			prod: {
				src: './',
				dest: '_deploy'
			}
		}
	};

	// Project configuration.
	grunt.initConfig(config);

	// Load some stuff
	grunt.loadNpmTasks('grunt-modernizr');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-devtools');
	grunt.loadNpmTasks('grunt-concurrent');
	grunt.loadNpmTasks('grunt-regarde');
	grunt.loadNpmTasks('grunt-contrib-livereload');
	grunt.loadNpmTasks('grunt-jekyll');

	// Installed but unused
	// grunt.loadNpmTasks('grunt-contrib-concat');
	// grunt.loadNpmTasks('grunt-csscss');
	// grunt.loadNpmTasks('grunt-notify'); // Automatic notifications when tasks fail.


	// =============
	// === Tasks ===
	// =============
	// A task for development
	grunt.registerTask('dev', ['jshint', 'uglify', 'sass:dev']);

	// A task for deployment
	grunt.registerTask('deploy', ['jshint', 'clean', 'modernizr', 'uglify', 'sass:deploy']);

	// Default task
	// grunt.registerTask('default', ['jshint', 'uglify', 'sass:dev']);

	// Default task 2: Same as above but this creates a server and watches the project for changes
	grunt.registerTask('default', ['jshint', 'uglify', 'sass:dev', 'copy']);

	grunt.registerTask('watcher', ['livereload-start', 'regarde']);

};

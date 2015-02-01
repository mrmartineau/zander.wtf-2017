module.exports = function (grunt) {

	'use strict';

	/**
	 * Project configuration
	 */
	grunt.initConfig({
		pkg: require('./package'), // <%=pkg.name%>

		/**
		 * Config - Edit this section
		 * ==========================
		 * Choose javascript dist filename
		 * Choose javascript dist location
		 * Choose javascript files to be uglified
		 */
		config : {
			js : {
				// <%=config.js.distDir%>
				distDir  : 'js/dist/',

				// <%=config.js.distFile%>
				distFile : 'app.min.js',

				// <%=config.js.fileList%>
				fileList : [
					'bower_components/swiftclick/js/libs/swiftclick.js',
					'bower_components/trak/dist/trak.js',
					'js/scrollConverter.js',
					'js/script.js'
				]
			}
		},


		/**
		 * Watch
		 * https://github.com/gruntjs/grunt-contrib-watch
		 * Watches your scss, js etc for changes and compiles them
		 */
		watch: {
			scss: {
				files: ['scss/**/*.scss'],
				tasks: ['sass:kickoff', 'autoprefixer:dist', 'csso', 'copy:css']
			},

			js: {
				files: ['<%=config.js.fileList%>', 'Gruntfile.js'],
				tasks: ['uglify', 'copy:js']
			},

			livereload: {
				options: { livereload: true },
				files: [
					'_site/css/*.css',
					'_site/**/*.html'
				]
			},

			grunticon : {
				files: ['img/src/*.svg', 'img/src/*.png'],
				tasks: ['svgmin', 'grunticon']
			},

			jekyll : {
				files: [
					'_includes/**/*.html',
					'_layouts/**/*.html',
					'_posts/**/*.md',
					'_work/**/*.md',
					'_blog/**/*.md',
					'_lab/**/*.md',
					'_drafts/**/*.md',
					'work/**/*.html',
					'blog/**/*.html',
					'search/**/*.html',
					'*.html',
					'img/**/*'
				],
				tasks: 'jekyll',
				options: {
					livereload: true
				}
			},

			// assets : {
			// 	files: ['img/**/*', '!img/posts/dist/**/*', '!img/projects/dist/**/*'],
			// 	tasks: ['clean', 'newer:imagemin']
			// }
		},


		/**
		 * Sass compilation
		 * https://github.com/gruntjs/grunt-contrib-sass
		 * Includes kickoff.scss and kickoff-old-ie.scss by default
		 * Also creates source maps
		 */
		sass: {
			kickoff: {
				options: {
					outputStyle: 'expanded',
					precision : 8,
					sourceMap: false
				},
				files: {
					'css/temp/kickoff.css' : 'scss/kickoff.scss',
					'css/temp/styleguide.css': 'scss/styleguide.scss'
				}
			}
		},


		/**
		 * Autoprefixer
		 * https://github.com/nDmitry/grunt-autoprefixer
		 * https://github.com/ai/autoprefixer
		 * Auto prefixes your CSS using caniuse data
		 */
		autoprefixer: {
			dist : {
				options: {
					// Task-specific options go here - we are supporting
					// the last 2 browsers, any browsers with >1% market share,
					// and ensuring we support IE7 + 8 with prefixes
					browsers: ['> 5%', 'last 2 versions', 'ie > 8'],
					map: false
				},
				files: {
					'css/kickoff.css' : 'css/temp/kickoff.css',
					'css/styleguide.css': 'css/temp/styleguide.css'
				}
			}
		},


		/**
		 * Uglify
		 * https://github.com/gruntjs/grunt-contrib-uglify
		 * Minifies and concatinates your JS
		 * Also creates source maps
		 */
		uglify: {
			options: {

				mangle: true, // mangle: Turn on or off mangling
				beautify: false, // beautify: beautify your code for debugging/troubleshooting purposes
				compress: false,
				// report: 'gzip', // report: Show file size report
				sourceMap: false
			},
			js: {
				src: '<%=config.js.fileList%>',
				dest: '<%=config.js.distDir%><%=config.js.distFile%>'
			}
		},


		/**
		 * Grunticon
		 * https://github.com/filamentgroup/grunticon
		 */
		grunticon: {
			myIcons: {
				files: [{
					expand: true,
					cwd   : 'img/src-min',
					src   : ['*.svg', '*.png'],
					dest  : 'img/icons'
				}]
			}
		},


		/**
		 * SVGmin
		 * https://github.com/sindresorhus/grunt-svgmin
		 */
		svgmin: {
			options: {
				plugins: [
					{ removeViewBox: false },
					{ removeUselessStrokeAndFill: false }
				]
			},
			dist: {                     // Target
				files: [{               // Dictionary of files
					expand: true,       // Enable dynamic expansion.
					cwd: 'img/src',     // Src matches are relative to this path.
					src: ['**/*.svg'],  // Actual pattern(s) to match.
					dest: 'img/src-min',       // Destination path prefix.
					ext: '.svg'     // Dest filepaths will have this extension.
					// ie: optimise img/src/branding/logo.svg and store it in img/branding/logo.min.svg
				}]
			}
		},

		imagemin: {
			projects: {
				files: [{
					expand: true,
					cwd: 'img/projects',
					src: ['**/*.{png,jpg,gif}'],
					dest: 'img/projects/dist/'
				}]
			},
			posts: {
				files: [{
					expand: true,
					cwd: 'img/posts',
					src: ['**/*.{png,jpg,gif}'],
					dest: 'img/posts/dist/'
				}]
			}
		},


		/**
		 * CSSO
		 * https://github.com/t32k/grunt-csso
		 * Minify CSS files with CSSO
		 */
		csso: {
			dist: {
				files: {
					'css/kickoff.css'   : 'css/kickoff.css',
					'css/styleguide.css': 'css/styleguide.css'
				},

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
					// port: 9001,
					// hostname: 'mysite.local',
					open: true,
					livereload: true,
					base: './_site'
				}
			}
		},

		/**
		 * browserSync
		 * http://www.browsersync.io/docs/options/
		 * http://www.browsersync.io/docs/grunt/
		 */
		browserSync: {
			serve: {
				bsFiles: {
					src: ['_site/css/*.css', '_site/js/*.js', '_site/**/*.html']
				},
				options: {
					watchTask: true,
					server: {
						baseDir: "./_site"
					}
				}
			}
		},


		/**
		 * Custom jQuery builder
		 * Check build numbers at jquery.com
		 */
		jquery: {
			build: {
				options: {
					prefix: "jquery-",
					minify: true
				},
				output: "js/libs/jquery",
				versions: {
					// Add items to the below arrays to remove them from the build
					// Remove everything we don't need from 2.x versions
					//"2.0.3": [ "deprecated", "dimensions", "offset", "wrap"],

					// We can't remove sizzle from 1.x versions, so let's not specify it
					"1.10.2": [ "deprecated"]
				}
			}
		},


		/**
		 * JSHint
		 * https://github.com/gruntjs/grunt-contrib-jshint
		 * Manage the options inside .jshintrc file
		 */
		jshint: {
			all: '<%=config.js.fileList%>',
			options: {
				jshintrc: '.jshintrc'
			}
		},


		/**
		 * JSCS
		 * https://github.com/dsheiko/grunt-jscs
		 * Manage the options inside .jscs.json file
		 */
		jscs: {
			src: '<%=config.js.fileList%>',
			options: {
				config: ".jscs.json"
			}
		},


		jekyll: {
			server : {
				server : false,
				auto   : false,
				drafts : false,
				future : false
			},
			site: {
				src: './',
				dest: '_site'
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
				files: [
					{ expand: true, cwd: './css', src: ['./**/*.*'], dest: '_site/css' }
				]
			},
			js: {
				files: [
					{ expand: true, cwd: './js', src: ['./**/*.*'], dest: '_site/js' }
				]
			}
		},

		clean: {
			postimages: ["img/posts/dist/**/*.*"],
			projectimages: ["img/projects/dist/**/*.*"]
		},

		'ftp-deploy': {
			dev: {
				auth: {
					host: '188.65.112.140',
					port: 21,
					authKey: 'key1'
				},
				src: '_site',
				dest: '/subdomains/dev.martineau.tv'
			},
			prod: {
				auth: {
					host: '188.65.112.140',
					port: 21,
					authKey: 'key1'
				},
				src: '_site',
				dest: '/public_html',
				exclusions: ['img/*/dist/*']
			},
			content: {
				auth: {
					host: '188.65.112.140',
					port: 21,
					authKey: 'key1'
				},
				src: '_site',
				dest: '/public_html',
				exclusions: ['img']
			}
		},

		rsync: {
			options: {
				// these are my preferred arguments when using rsync
				args: ['-avz', '--verbose', '--delete'],
				// an array of files you'd like to exclude; usual suspects...
				exclude: ['.git*', 'cache', 'logs'],
				recursive: true
			},
			prod: {
				options: {
					// the dir you want to sync, in this case the current dir
					src: '_site',
					// where should it be synced to on the remote host?
					dest: '/subdomains/dev.martineau.tv',
					// what's the creds and host
					host: 'zanderm@rathersplendid.net@188.65.112.140'
				}
			}
		},

		uncss: {
			dist: {
				options: {
					timeout      : 1000,
					htmlroot     : '_site',
					report       : 'min',
					media        : ['(min-width: 1300px)'],
				},
				files: {
					'css/uncss.css': ['_site/index.html', '_site/blog/index.html', '_site/work/index.html', '_site/2014/08/pinboard-chrome-extension/index.html']
				}
			}
		}
	});

	// Load all the grunt tasks
	require('load-grunt-tasks')(grunt);


	/* ==========================================================================
		Available tasks:
		* grunt        : run jshint, uglify and sass:kickoff
		* grunt watch  : run sass:kickoff, uglify and livereload
		* grunt dev    : run jshint, uglify and sass:kickoff
		* grunt deploy : run jshint, uglify, sass:kickoff and csso
		* grunt jquery : build custom version of jquery
		* grunt serve  : watch js & scss and run a local server
		* grunt availabletasks : view all available tasks
		 ========================================================================== */

	/**
	 * GRUNT * Default task
	 * run jshint, uglify and sass:kickoff
	 */
	// Default task
	grunt.registerTask('default', [
		'jshint',
		'uglify',
		'sass:kickoff',
		'autoprefixer:dist'
	]);


	/**
	 * GRUNT DEV * A task for development
	 * run jshint, uglify and sass:kickoff
	 */
	grunt.registerTask('dev', [
		'uglify',
		'sass:kickoff',
		'autoprefixer:dist'
	]);


	/**
	 * GRUNT DEPLOY * A task for your production environment
	 * run jshint, uglify and sass:production
	 */
	grunt.registerTask('deploy', [
		'jekyll',
		'uglify',
		'sass:kickoff',
		'autoprefixer:dist',
		'csso',
		'ftp-deploy:content'
	]);
	grunt.registerTask('deployall', [
		'jekyll',
		'uglify',
		'sass:kickoff',
		'autoprefixer:dist',
		'csso',
		'ftp-deploy:prod'
	]);


	/**
	 * GRUNT SERVE * A task for for a static server with a watch
	 * run connect and watch
	 */
	grunt.registerTask("serve", [
		'jekyll',
		'uglify',
		'sass:kickoff',
		'autoprefixer:dist',
		'csso',
		'browserSync:serve',
		'watch'
	]);
};

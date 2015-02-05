'use strict';

// Include Gulp & Tools We'll Use
var gulp        = require('gulp');
var $           = require('gulp-load-plugins')();
var del         = require('del');
var runSequence = require('run-sequence');
var browserSync = require('browser-sync');
var pagespeed   = require('psi');
var reload      = browserSync.reload;
var notifier    = require('node-notifier');


var CONFIG = {
	JS : {
		DISTDIR : 'js/dist/', // CONFIG.JS.DISTDIR
		DISTFILE : 'app.min.js', // CONFIG.JS.DISTFILE
		LIBS : [ // CONFIG.JS.LIBS
			'bower_components/swiftclick/js/libs/swiftclick.js',
			'bower_components/trak/dist/trak.js',
			// 'js/scrollConverter.js',
		],
		FILELIST : [ // CONFIG.JS.FILELIST
			'js/script.js'
		]
	},

	CSS : {
		SRCDIR : 'scss'
	},

	AUTOPREFIXER_BROWSERS : [
		'> 5%',
		'last 2 versions',
		'ie > 8'
	]
};

var jsFiles = CONFIG.JS.LIBS.concat(CONFIG.JS.FILELIST);


// Compile and Automatically Prefix Stylesheets
gulp.task('styles', function () {
	var s = $.size();

	// For best performance, don't add Sass partials to `gulp.src`
	return gulp.src([CONFIG.CSS.SRCDIR + '/**/*.scss'])
		.pipe(s)
		.pipe($.sourcemaps.init())
			.pipe($.sass({
				precision: 10,
				onError: console.error.bind(console, 'Sass error:\n')
			}))
		.pipe($.sourcemaps.write())
		.pipe($.autoprefixer({browsers: CONFIG.AUTOPREFIXER_BROWSERS}))

		// Concatenate And Minify Styles
		.pipe($.if('*.css', $.csso()))
		.pipe(gulp.dest('css'))
		.pipe(
			$.notify({
				onLast: true,
				title: 'Build CSS styles completed',
				message: function () {
					return 'Total size ' + s.prettySize;
				}
			})
		)
		.pipe($.size({title: 'styles'}));

		// Not needed here because we are using jekyll
		// .pipe(browserSync.reload({stream:true}));

});


// COPY CSS
gulp.task('copy:css', function () {
	return gulp.src([
			'css/*'
		], {
			dot: true
		})
		.pipe(gulp.dest('_site/css'))
		.pipe($.size({title: 'copy:css'}))
		.pipe(browserSync.reload({stream:true}));
});


// COPY JS
gulp.task('copy:js', function () {
	return gulp.src([
			'js/*'
		], {
			dot: true
		})
		.pipe(gulp.dest('_site/js'))
		.pipe($.size({title: 'copy:js'}))
		.pipe(browserSync.reload({stream:true}));
});


// JAVASCRIPT
gulp.task('js', function() {
	return gulp.src(jsFiles)
		.pipe($.changed('.tmp/js', {extension: '.js'}))
		.pipe($.sourcemaps.init())
			.pipe($.concat('app.min.js'))
		.pipe($.sourcemaps.write())
		.pipe($.uglify())
		.pipe(gulp.dest(CONFIG.JS.DISTDIR))
		.pipe($.size({title: 'js'}));
});


gulp.task('jekyll', function () {
	var build = require('child_process').spawn('jekyll', ['build', '--future'], {stdio: 'inherit'});
	build.on('exit', browserSync.reload);
});


// Watch Files For Changes & Reload
gulp.task('serve', ['styles', 'copy:css', 'js', 'copy:js', 'jekyll'], function () {
	browserSync({
		notify: false,
		// Customize the BrowserSync console logging prefix
		// logPrefix: 'WSK',
		// Run as an https by uncommenting 'https: true'
		// Note: this uses an unsigned certificate which on first access
		//       will present a certificate warning in the browser.
		// https: true,
		server: {
			baseDir: "./_site"
		}
	});

	gulp.watch([
			'./_includes/*.html',
			'./_layouts/*.html',
			'./_posts/*.md',
			'./_work/*.md',
			'./_blog/*.md',
			'./_lab/*.md',
			'./_drafts/*.md',
			'./work/**/*.html',
			'./blog/**/*.html',
			'./search/**/*.html',
			'./*.html'
		], ['jekyll']);
	gulp.watch(['scss/**/*.scss'], ['styles']);
	gulp.watch(['css/*.css'], ['copy:css']);
	gulp.watch(['js/**/*.js'], ['jshint']);
	gulp.watch(['js/app.js'], ['copy:js']);
	// gulp.watch(['img/**/*'], browserSync.reload);
});


// Build Production Files, the Default Task
gulp.task('default', function (cb) {
	runSequence('styles', ['jshint', 'js'], cb);
});


// Run PageSpeed Insights
gulp.task('pagespeed', function (cb) {
	// Update the below URL to the public URL of your site
	pagespeed.output('martineau.tv', {
		strategy: 'mobile',
	}, cb);
});


// Lint JavaScript
gulp.task('jshint', function () {
	return gulp.src(CONFIG.JS.FILELIST)
		.pipe(reload({stream: true, once: true}))
		.pipe($.jshint())
		.pipe($.jshint.reporter('jshint-stylish'))
		.pipe($.if(!browserSync.active, $.jshint.reporter('fail')));
});

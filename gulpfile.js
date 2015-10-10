'use strict';

// Include Gulp & Tools We'll Use
var gulp        = require('gulp');
var $           = require('gulp-load-plugins')();
var runSequence = require('run-sequence');
var browserSync = require('browser-sync');
var reload      = browserSync.reload;
var browserify  = require('browserify');
var uglify      = require('gulp-uglify');
var transform   = require('vinyl-transform');


var CONFIG = {
	JS : {
		SRCFILE : 'js/zander.js', // CONFIG.JS.SRCFILE
		DISTDIR : 'js/dist/', // CONFIG.JS.DISTDIR
		DISTFILE : 'zander.js', // CONFIG.JS.DISTFILE
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
		.pipe($.size({title: 'styles'}))
		.pipe(browserSync.reload({stream:true}));

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


// JAVASCRIPT
gulp.task('browserify', function () {
	var browserified = transform(function(filename) {
		var b = browserify(filename);
		return b.bundle();
	});

	return gulp.src(CONFIG.JS.SRCFILE)
		.pipe(browserified)
		.pipe($.uglify())
		.pipe(gulp.dest(CONFIG.JS.DISTDIR))
		.pipe(browserSync.reload({stream:true}));
});

// Serve site, watch files for changes & reload
gulp.task('watcher', ['styles', 'copy:css', 'browserify'], function () {
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

	gulp.watch(['scss/**/*.scss'], ['styles']);
	gulp.watch(['css/*.css'], ['copy:css']);
	gulp.watch(['js/**/*.js', '!js/dist/zander.js'], ['browserify']);
	// gulp.watch(['js/dist/zander.js'], ['copy:js']);
	// gulp.watch(['img/**/*'], browserSync.reload);
});


// Build Production Files, the Default Task
gulp.task('default', function (cb) {
	runSequence('styles', ['js'], cb);
});

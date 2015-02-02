/**
 *
 *  Web Starter Kit
 *  Copyright 2014 Google Inc. All rights reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License
 *
 */

'use strict';

// Include Gulp & Tools We'll Use
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var del = require('del');
var runSequence = require('run-sequence');
var browserSync = require('browser-sync');
var pagespeed = require('psi');
var reload = browserSync.reload;


var CONFIG = {
	JS : {
		DISTDIR : 'js/dist/', // CONFIG.JS.DISTDIR
		DISTFILE : 'app.min.js', // CONFIG.JS.DISTFILE
		FILELIST : [ // CONFIG.JS.FILELIST
			'bower_components/swiftclick/js/libs/swiftclick.js',
			'bower_components/trak/dist/trak.js',
			'js/scrollConverter.js',
			'js/script.js'
		]
	},

	CSS : {

	},

	AUTOPREFIXER_BROWSERS : [
		'> 5%',
		'last 2 versions',
		'ie > 8'
	]
};



// Compile and Automatically Prefix Stylesheets
gulp.task('styles', function () {
	// For best performance, don't add Sass partials to `gulp.src`
	return gulp.src([
			'scss/**/*.scss'
		])
		// .pipe($.changed('.tmp/styles', {extension: '.css'}))
		.pipe($.sourcemaps.init())
			.pipe($.sass({
				precision: 10,
				onError: console.error.bind(console, 'Sass error:')
			}))
		.pipe($.sourcemaps.write())
		.pipe($.autoprefixer({browsers: CONFIG.AUTOPREFIXER_BROWSERS}))
		// .pipe(gulp.dest('.tmp/styles'))

		// Concatenate And Minify Styles
		.pipe($.if('*.css', $.csso()))
		.pipe(gulp.dest('css'))
		.pipe($.size({title: 'styles'}));
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
gulp.task('js', function() {
	return gulp.src(CONFIG.JS.FILELIST)
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
gulp.task('serve', ['styles', 'js', 'jekyll'], function () {
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
	// gulp.watch(['img/**/*'], browserSync.reload);
});



// Build and serve the output from the dist build
// gulp.task('serve:dist', ['default'], function () {
// 	browserSync({
// 		notify: false,
// 		logPrefix: 'WSK',
// 		// Run as an https by uncommenting 'https: true'
// 		// Note: this uses an unsigned certificate which on first access
// 		//       will present a certificate warning in the browser.
// 		// https: true,
// 		server: 'dist'
// 	});
// });



// Clean Output Directory
gulp.task('clean', del.bind(null, ['.tmp', 'dist/*', '!dist/.git'], {dot: true}));


// Copy Web Fonts To Dist
gulp.task('fonts', function () {
	return gulp.src(['app/fonts/**'])
		.pipe(gulp.dest('dist/fonts'))
		.pipe($.size({title: 'fonts'}));
});


// Build Production Files, the Default Task
gulp.task('default', ['clean'], function (cb) {
	runSequence('styles', ['jshint', 'html', 'images', 'fonts', 'copy'], cb);
});


// Run PageSpeed Insights
gulp.task('pagespeed', function (cb) {
	// Update the below URL to the public URL of your site
	pagespeed.output('example.com', {
		strategy: 'mobile',
		// By default we use the PageSpeed Insights free (no API key) tier.
		// Use a Google Developer API key if you have one: http://goo.gl/RkN0vE
		// key: 'YOUR_API_KEY'
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


// Optimize Images
// gulp.task('images', function () {
// 	return gulp.src('app/images/**/*')
// 		.pipe($.cache($.imagemin({
// 			progressive: true,
// 			interlaced: true
// 		})))
// 		.pipe(gulp.dest('dist/images'))
// 		.pipe($.size({title: 'images'}));
// });

// Load custom tasks from the `tasks` directory
// try { require('require-dir')('tasks'); } catch (err) { console.error(err); }

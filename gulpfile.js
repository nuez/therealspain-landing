/**
 * @file
 * @fileGlobal -$ */

'use strict';
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var sass = require('gulp-sass');
var livereload = require('gulp-livereload');
var sassGlob = require('gulp-sass-glob');

// Error notifications.
var reportError = function (error) {
  $.notify({
    title: 'Gulp Task Error',
    message: 'Check the console.'
  }).write(error);
  console.log(error.toString());
  this.emit('end');
}

gulp.task('html', function () {
  return gulp.src("index.html")
    .pipe(livereload());
});

// Sass processing.
gulp.task('sass', function () {
  return gulp.src('scss/**/*.scss')
    .pipe($.sourcemaps.init())
    // Convert sass into css.
    .pipe(sassGlob())
    .pipe($.sass({
      outputStyle: 'nested', // Libsass doesn't support expanded yet.
      precision: 10
    }))
    // Show errors.
    .on('error', reportError)
    // Autoprefix properties.
    .pipe($.autoprefixer({
      browsers: ['last 2 versions']
    }))
    // Write sourcemaps.
    .pipe($.sourcemaps.write())
    // Save css.
    .pipe(gulp.dest('css'))
    .pipe(livereload());
});


// Default task to be run with `gulp`.
gulp.task('default', ['sass', 'html'], function () {
  livereload.listen();
  gulp.watch("scss/**/*.scss", ['sass']);

    gulp.watch("index.html", ['html']);
});

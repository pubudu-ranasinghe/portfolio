'use strict';
 
var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();

// sass compiling with browsersync stream 
gulp.task('sass', function () {
  return gulp.src('./sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css/'))
    .pipe(browserSync.stream());
});
 
// watching sass folder 
gulp.task('sass:watch', function () {
  gulp.watch('./sass/**/*.scss', ['sass']);
});

// browsersync server
gulp.task('serve', ['sass'], function() {
  browserSync.init({
    server: true
  });
  gulp.watch('./sass/**/*.scss', ['sass']);
  gulp.watch('./*.html').on('change', browserSync.reload);
});

// default action to serve
gulp.task('default', ['serve']);
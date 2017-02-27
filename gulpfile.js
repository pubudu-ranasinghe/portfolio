'use strict';
 
var gulp = require('gulp');
var sass = require('gulp-sass');
var runSequence = require('run-sequence');
var del = require('del');
var cssnano = require('gulp-cssnano')
var imagemin = require('gulp-imagemin');
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

// clean dist directory
gulp.task('clean', function () {
  return del('dist/*');
});

// compile sass, minify and copy to dist/css
gulp.task('styles', ['sass'], function() {
  return gulp.src('css/*.css')
    .pipe(cssnano())
    .pipe(gulp.dest('dist/css'));
});

// copy img folder to dist TODO: optimize
gulp.task('images', function() {
  return gulp.src(['img/*.*'])
    .pipe(imagemin({
      progressive: true,
      interlaced: true
    }))
    .pipe(gulp.dest('dist/img'));
});

// copy html files to dist
gulp.task('copy', function() {
  return gulp.src(['*.html', 'favicon.ico'])
    .pipe(gulp.dest('dist'));
});

// build production
gulp.task('build', ['clean'], function (cb) {
  runSequence(
    'styles',
    'images',
    'copy',
    cb
  );
});

// default action to serve
gulp.task('default', ['serve']);
'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const sourceMaps = require('gulp-sourcemaps');
const imagemin = require('gulp-imagemin');
const browserSync = require('browser-sync').create();

// Compile scss
function styles() {
  return gulp
    .src('./src/scss/**/*.scss')
    .pipe(sourceMaps.init())
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(sourceMaps.write('./'))
    .pipe(gulp.dest('./build/css'))
    .pipe(browserSync.stream());
}

// Watch for html, scss, and javascript changes
function watch() {
  // Start server
  browserSync.init({
    server: {
      baseDir: './build'
    }
  });

  gulp.watch('./build/*.html').on('change', browserSync.reload);
  gulp.watch('./src/scss/**/*.scss', styles);
}

// Optimize images
function images() {
  return gulp
    .src('./src/img/*')
    .pipe(imagemin([imagemin.jpegtran({ progressive: true })]))
    .pipe(gulp.dest('./build/img'));
}

exports.styles = styles;
exports.watch = watch;
exports.images = images;
exports.default = watch;

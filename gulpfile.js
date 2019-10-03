'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const sourceMaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const browserSync = require('browser-sync').create();
const del = require('del');

// Compile, compress, and autoprefix SCSS
function styles() {
  return gulp
    .src('./src/scss/**/*.scss')
    .pipe(sourceMaps.init())
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(sourceMaps.write('./'))
    .pipe(gulp.dest('./build/css'))
    .pipe(browserSync.stream());
}

// Compile and compress JavaScript
function scripts() {
  return gulp
    .src('./src/js/app.js')
    .pipe(babel({ presets: ['@babel/env'] }))
    .pipe(uglify())
    .pipe(gulp.dest('./build/js'))
    .pipe(browserSync.stream());
}

// Watch for HTML, SCSS, and JavaScript changes
function watch() {
  // Start server
  browserSync.init({
    server: {
      baseDir: './build'
    }
  });

  gulp.watch('./build/*.html').on('change', browserSync.reload);
  gulp.watch('./src/scss/**/*.scss', styles);
  gulp.watch('./src/js/app.js', scripts);
}

// Optimize images
function images() {
  return gulp
    .src('./src/img/*')
    .pipe(imagemin([imagemin.jpegtran({ progressive: true })]))
    .pipe(gulp.dest('./build/img'));
}

// Delete CSS, JavaScript, and image folders in build
function cleanBuild(done) {
  del(['./build/css', './build/js', './build/img']);
  done();
}

// Development mode
const devMode = gulp.series(styles, scripts, watch);

// Create build for production
const createBuild = gulp.series(cleanBuild, styles, scripts, images);

exports.styles = styles;
exports.scripts = scripts;
exports.watch = watch;
exports.images = images;
exports.cleanBuild = cleanBuild;
exports.createBuild = createBuild;
exports.default = devMode;

var gulp = require('gulp'),
    minifycss = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify');

gulp.task('process-css', function() {
  return gulp.src('public/stylesheets/*.css')
    .pipe(minifycss())
    .pipe(rename({suffix: '.min' }))
    .pipe(gulp.dest('public/stylesheets/'));
    
});

gulp.task('process-js', function() {
  return gulp.src('public/js/**/*.js')
    .pipe(concat('app.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('public/js/'));
});

gulp.task('default', function() {
});

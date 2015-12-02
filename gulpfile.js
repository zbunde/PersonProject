var run = require('run-sequence');
var gulp = require('gulp');
var copy = require('gulp-copy');
var util = require('gulp-util');
var watch = require('gulp-watch');
var bower = require('gulp-bower');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var rimraf = require('rimraf');
var mincss = require('gulp-minify-css');
var gulpif = require('gulp-if');

var paths = {
  allsrc: ['./client/**/*'],
  htmlsrc: ['./client/**/*.html'],
  imgsrc: ['./client/images/**/*'],
  jssrc: ['./client/**/*.js'],
  csssrc: ['./client/**/*.css'],
  destination: './public'
};

// --> TASKS ********************************** //

gulp.task('default', ['clean:public'], function(cb){
  run('bower', 'build', 'watch', cb);
});

gulp.task('build', function(cb){
  run('copy:html', 'copy:images', 'js', 'css', cb);
});

// --> TASKS ********************************** //

gulp.task('clean:public', function(cb){
  rimraf(paths.destination, cb);
});

gulp.task('bower', function(){
  return bower();
});

gulp.task('js', function(){
  return gulp.src(paths.jssrc)
    .pipe(concat('index.js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest(paths.destination))
    .on('error', util.log);
});

gulp.task('css', function(){
  return gulp.src(paths.csssrc)
      .pipe(mincss())
      .pipe(concat('style.min.css'))
      .pipe(gulp.dest(paths.destination))
      .on('error', util.log);
});

gulp.task('copy:html', function(){
  return gulp.src(paths.htmlsrc)
    .pipe(copy(paths.destination, {prefix: 1}))
    .on('error', util.log);
});

gulp.task('copy:images', function(){
  return gulp.src(paths.imgsrc)
    .pipe(copy(paths.destination, {prefix: 1}))
    .on('error', util.log);
});

gulp.task('watch', function(){
  return watch(paths.allsrc, function(){
    gulp.start('build');
  });
});

import run from 'run-sequence';
import gulp from 'gulp';
import copy from 'gulp-copy';
import sass from 'gulp-sass';
import util from 'gulp-util';
import watch from 'gulp-watch';
import bower from 'gulp-bower';
import shell from 'gulp-shell';
import concat from 'gulp-concat';
import uglify from 'gulp-uglify';
import rename from 'gulp-rename';
import rimraf from 'rimraf';
import mincss from 'gulp-minify-css';
import gulpif from 'gulp-if';

var paths = {
  allsrc: ['./client/**/*'],
  htmlsrc: ['./client/**/*.html'],
  imgsrc: ['./client/images/**/*'],
  jssrc: ['./client/**/*.js'],
  sasssrc: ['./client/**/*.scss'],
  destination: './public'
};

// --> TASKS ********************************** //

gulp.task('default', ['clean:public'], function(cb){
  run('bower', 'build', 'watch', cb);
});

gulp.task('build', function(cb){
  run('copy:html', 'copy:images', 'js', 'sass', cb);
});

gulp.task('build:server', function(cb){
  run('clean:server', 'babel:server', cb);
});

// --> TASKS ********************************** //

gulp.task('clean:public', function(cb){
  rimraf(paths.destination, cb);
});

gulp.task('clean:server', function(cb){
  rimraf('./server/dist', cb);
});

gulp.task('bower', function(){
  return bower();
});

gulp.task('babel:server', shell.task([
  'babel server/src --out-dir server/dist'
]));

gulp.task('js', function(){
  return gulp.src(paths.jssrc)
    .pipe(concat('index.js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest(paths.destination))
    .on('error', util.log);
});

gulp.task('sass', function(){
  return gulp.src(paths.sasssrc)
      .pipe(sass())
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
    gulp.start('prod:build');
  });
});

gulp.task('watch:code', () => {
  return watch('./server/src/**/*.js', () => {
    gulp.start('build:server');
  });
});

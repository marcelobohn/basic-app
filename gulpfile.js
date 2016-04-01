var gulp = require('gulp');
var webserver = require('gulp-webserver');
var connect = require('gulp-connect');
var sass = require('gulp-sass');
var clean = require('gulp-clean');
var minify = require('gulp-minify');
var minifyHtml = require("gulp-minify-html");
 
gulp.task('webserver1', function() {
  gulp.src('app')
    .pipe(webserver({
      fallback: 'app/index.html'
    }));
});

gulp.task('webserver2', function() {
  gulp.src('app')
    .pipe(webserver({
      livereload: true,
      directoryListing: true,
      open: true
    }));
});

gulp.task('webserver3', function() {
  connect.server();
});

//cleaner dist
gulp.task('clean', function(){
  gulp.src(['dist/*'], {read:false})
    .pipe(clean());
});

//compile sass
gulp.task('sass', function () {
  gulp.src(['app/scss/*.scss'])
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(gulp.dest('dist/css/'));
});

gulp.task('compress-js', function() {
  gulp.src('app/js/*.js')
    .pipe(minify({
        ext:{
            src:'-debug.js',
            min:'.js'
        },
        exclude: ['tasks'],
        ignoreFiles: ['.combo.js', '-min.js']
    }))
    .pipe(gulp.dest('dist/js/'))
});

//copy html
gulp.task('copy-html', function () {
  gulp.src(['app/*.html'])
    .pipe(gulp.dest('dist/'));
});

gulp.task('minify-html', function () {
    gulp.src('app/*.html') // path to your files
    .pipe(minifyHtml())
    .pipe(gulp.dest('dist/'));
});

// Default task
// gulp.task('default', ['webserver3']);
gulp.task('default', function () {
  gulp.start('minify-html');
  gulp.start('sass');
  gulp.start('compress-js');
});
var gulp = require('gulp');
var webserver = require('gulp-webserver');
var connect = require('gulp-connect');
var sass = require('gulp-sass');
var clean = require('gulp-clean');
 
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

//copy html
gulp.task('html', function () {
  gulp.src(['app/*.html'])
    .pipe(gulp.dest('dist/'));
});

// Default task
// gulp.task('default', ['webserver3']);
gulp.task('default', function () {
  gulp.start('clean');
  gulp.start('html');
  gulp.start('sass');
});
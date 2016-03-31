var gulp = require('gulp');
var webserver = require('gulp-webserver');
var connect = require('gulp-connect');
 
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

gulp.task('default', ['webserver3']);
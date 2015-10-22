var gulp       = require('gulp');
var browserify = require('browserify');
var babelify   = require('babelify');
var source     = require('vinyl-source-stream');
var sass       = require('gulp-sass');

gulp.task('scss', function() {
  gulp.src('./scss/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(gulp.dest('.'));
});

gulp.task('js', function () {
  return browserify({entries: './app/main.js', extensions: ['.js'], debug: true})
    .transform(babelify)
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('.'));
});

gulp.task('watch', ['js', 'scss'], function () {
  gulp.watch('./app/**/*.js', ['js']);
  gulp.watch('./scss/**/*.scss', ['scss']);
});

gulp.task('default', ['watch']);

var gulp       = require('gulp');
var browserify = require('browserify');
var babelify   = require('babelify');
var source     = require('vinyl-source-stream');
var uglify     = require('gulp-uglify');

gulp.task('js', function () {
  return browserify({entries: './src/index.js', extensions: ['.js'], debug: true})
    .transform(babelify)
    .bundle()
    .pipe(source('index.js'))
    .pipe(gulp.dest('.'));
});

gulp.task('compress', ['js'], function() {
  return gulp.src('./index.js')
    .pipe(uglify())
    .pipe(gulp.dest('./'));
});

gulp.task('watch', ['compress'], function () {
  gulp.watch('./src/**/*.js', ['js']);
});

gulp.task('default', ['watch']);

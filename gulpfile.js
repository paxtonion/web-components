var gulp = require('gulp');
var watch = require('gulp-watch');
var plumber = require('gulp-plumber');
var babel = require('gulp-babel');
var uglify = require('gulp-uglify');

var es6src = 'components-es6/**/*.es6';
var es5dest = 'scripts/compiled';

gulp.task('es6-es5', function () {
	
	return gulp
		.src([es6src])
		.pipe(plumber(err => console.log(err.stack)))
		.pipe(babel())
		.pipe(uglify())
		.pipe(plumber.stop())
		.pipe(gulp.dest(es5dest));
});

gulp.task('watch', function () {
	
	gulp.watch(es6src, ['es6-es5']);
});
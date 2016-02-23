var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();

gulp.task('serve', ['sass'], function() {

	browserSync.init({
			server: {
					baseDir: "./"
			}
	});

	gulp.watch("./**/*.scss", ['sass'])

});

/* Need to make sure Angular will take the compression. */

// gulp.task('compress', function () {
// 	return gulp.src('./js/**/*.js')
// 		.pipe(minify())
// 		.pipe(gulp.dest('./build'));
// });

gulp.task('sass', function() {
    return gulp.src("./style/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("./style"))
        .pipe(browserSync.stream());
});


gulp.task('default', ['sass']);

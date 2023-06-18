const gulp = require('gulp');
const htmlmin = require('gulp-htmlmin');




gulp.task('watch', function() {
    gulp.watch('src/*.html').on('change', gulp.parallel('html'))
});

gulp.task('html', function() {
    return gulp.src('src/*.html')
           .pipe(htmlmin({ collapseWhitespace: true }))
           .pipe(gulp.dest('dist/'))
});




gulp.task('default', gulp.parallel('watch', 'html'));
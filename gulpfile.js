const gulp = require('gulp');
const browserSyns = require('browser-sync');
const sass = require('gulp-sass')(require('sass'));
const htmlmin = require('gulp-htmlmin');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const rename = require("gulp-rename");



gulp.task('styles', function() {
    return gulp.src('src/scss/**/*.scss')
            .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
            .pipe(rename({
                prefix: "",
                suffix: ".min",
              }))
            .pipe(autoprefixer({
                cascade: false
            }))
            .pipe(cleanCSS({compatibility: 'ie8'}))
            .pipe(gulp.dest('dist/css'))
            .pipe(browserSyns.stream());
});

gulp.task('server', function() {
    browserSyns.init({
        server: {
            baseDir: 'dist'
        }
    });
});


gulp.task('watch', function() {
    gulp.watch('src/scss/**/*.+(scss|sass|css)', gulp.parallel('styles'))
    gulp.watch('src/*.html').on('change', gulp.parallel('html'))
});

gulp.task('html', function() {
    return gulp.src('src/*.html')
           .pipe(htmlmin({ collapseWhitespace: true }))
           .pipe(gulp.dest('dist/'))
});

gulp.task('copy', function() {
    return gulp.src('src/**/*')
           .pipe(gulp.dest('dist/'))
})


gulp.task('default', gulp.parallel('watch', 'server', 'styles', 'html', 'copy'));
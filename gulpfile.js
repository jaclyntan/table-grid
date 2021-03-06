var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    rename = require('gulp-rename'),
    autoprefixer = require('gulp-autoprefixer'),
    cleanCSS = require('gulp-clean-css'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync').create();

gulp.task('browser-sync', function () {
    browserSync.init({
        server: {
          baseDir: "./"
        },
        startPath: "/_layouts/update.html"
//        proxy: "localhost:8888/table-grid/layouts/update.html"
    });
});

gulp.task('bs-reload', function () {
    browserSync.reload();
});


gulp.task('styles', function () {
    gulp.src(['sass/**/*.scss'])
        .pipe(plumber({
            errorHandler: function (error) {
                console.log(error.message);
                this.emit('end');
            }
        }))
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(gulp.dest('./'))
    .pipe(browserSync.reload({
            stream: true
        }))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(cleanCSS())
        .pipe(gulp.dest('./'))
        .pipe(browserSync.reload({
            stream: true
        }))
});


gulp.task('default', ['browser-sync'], function () {
    gulp.watch("sass/**/*.scss", ['styles']);
    gulp.watch("_layouts/**/*.html", ['bs-reload']);
});
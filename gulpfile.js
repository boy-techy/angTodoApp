var gulp = require('gulp'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    cssnano = require('gulp-cssnano')

gulp.task('scss',function(){
    gulp.src('./app/styles/**/style.scss')
        .pipe(sass())
        .pipe(concat('style.css'))
        .pipe(cssnano())
        .pipe(gulp.dest('./app/build/styles/'));
});


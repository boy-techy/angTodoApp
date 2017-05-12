var gulp = require('gulp'),
    webserver = require('gulp-webserver'),
    sass = require('gulp-sass'),
    jshint = require('gulp-jshint'),
    sourcemaps = require('gulp-sourcemaps'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    uglify = require('gulp-uglify'),
    gutil = require('gulp-util'),
    ngAnnotate = require('browserify-ngannotate');
    nodemon = require('gulp-nodemon');


gulp.task('build-css', function() {
    return gulp.src('./app/styles/*')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./app/dist'));
});

gulp.task('jshint', function() {
    gulp.src('/scripts/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('build-js', function() {
    var b = browserify({
        entries: './app/index.js',
        debug: true,
        paths: './app/**/*.js',
        transform: [ngAnnotate]
    });

    return b.bundle()
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(uglify())
        .on('error', gutil.log)
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./app/dist/js/'));
});

gulp.task('build', [ 'build-css', 'jshint', 'build-js'], function() {
    return gulp.src('index.html')
        .pipe(gulp.dest('dist'));
});

gulp.task('watch',['build'], function() {
    return gulp.watch(['./app/index.html','./app/**/*.html', './app/styles/*.*css', './app/**/*.js'], ['build']);
});

gulp.task('develop',function () {
   nodemon({
       script: './server.js'
   }).on('start',['build','watch'])
});
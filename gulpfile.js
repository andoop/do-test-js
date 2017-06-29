/**
 * Created by domob on 2017/6/23.
 */
var gulp = require('gulp');
var fileinclude  = require('gulp-file-include');

gulp.task('copy', function() {
    return gulp.src('src/**/*')
        .pipe(gulp.dest('dist'))
});

gulp.task('fileinclude',['copy'], function() {
    gulp.src('src/**.html')
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest('dist'));
});


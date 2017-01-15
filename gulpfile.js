/**
 * Created by dieffrei on 15/01/17.
 */
/**
 * Created by dieffrei on 10/12/16.
 */
const gulp = require('gulp');
const del = require('del');
const zip = require('gulp-zip');
const minify = require('gulp-minify');
const concat = require('gulp-concat');


gulp.task('clear', function() {
    del.sync(['dist']);
});

gulp.task('minify', function() {
    gulp.src('dist/*.js')
        .pipe(minify({
            ext:{
                src:'.debug.js',
                min:'.js'
            },
            exclude: ['bower_components']
        }))
        .pipe(gulp.dest('dist/min'))
});

gulp.task('concat', function() {
    return gulp.src('src/**/*.js')
        .pipe(concat('chrome-force.js'))
        .pipe(gulp.dest('dist'));
});


gulp.task('build', ['clear', 'concat', 'minify']);

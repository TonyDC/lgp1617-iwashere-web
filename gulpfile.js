"use strict";

const gulp = require('gulp');
const uglify = require('gulp-uglify');
const pump = require('pump');
const babel = require('gulp-babel');

gulp.task('compress', (cb) => {
    pump(
        [
            gulp.src('src/js/external/*.js'),
            babel({ presets: ['es2015'] }),
            uglify(),
            gulp.dest('public')
        ],
        cb
    );
});

gulp.task('default', () => {
    gulp.start('compress');
});

'use strict';

var gulp     = require('gulp');
var clean    = require('gulp-clean');
var eslint   = require('gulp-eslint');
var replace  = require('gulp-replace');
var sequence = require('gulp-sequence');
var uglify   = require('gulp-uglify');
var webpack  = require('gulp-webpack-build');
var path     = require('path');

var build = __dirname;
var root  = path.resolve(build, '..');
var dist  = path.join(root, 'dist');
var src   = path.join(root, 'src');

gulp.task('clean', function () {
    return gulp.src(path.join(dist, '*'), { read: false })
        .pipe(clean({ force: true }));
});

gulp.task('compress', function () {
    return gulp.src(path.join(dist, '**', '*.js'), { base: dist })
        .pipe(uglify({
            beautify: false,
            compress: {
                dead_code:     true,
                drop_console:  true,
                drop_debugger: true,
                screw_ie8:     true
            },
            mangle:   {
                screw_ie8: true
            },
            output:   {
                quote_style: 3
            },
            stats:    true,
            verbose:  true
        }))
        .pipe(replace(/ *\n */g, ''))
        .pipe(gulp.dest(dist));
});

gulp.task('lint', function () {
    return gulp.src(path.join(src, '**', '*.js'))
        .pipe(eslint(path.join(root, '.eslintrc')))
        .pipe(eslint.failOnError());
});

gulp.task('webpack', function () {
    return gulp.src(path.join(build, 'webpack.js'))
        .pipe(webpack.configure({
            useMemoryFs: true,
            progress:    true
        }))
        .pipe(webpack.compile())
        .pipe(webpack.format({
            verbose: true,
            version: false
        }))
        .pipe(webpack.failAfter({
            errors:   true,
            warnings: true
        }))
        .pipe(gulp.dest(dist));
});

gulp.task('default', sequence('lint', 'clean', 'webpack', 'compress'));

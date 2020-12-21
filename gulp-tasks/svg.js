'use strict';
const path = require('path');
import { paths } from '../gulpfile.babel';
import gulp from 'gulp';
import tap from 'gulp-tap';
import svgmin from 'gulp-svgmin';
import cheerio from 'gulp-cheerio';
import replace from 'gulp-replace';
import debug from 'gulp-debug';
import browsersync from 'browser-sync';

gulp.task('svg', () => {
    return gulp
        .src(paths.svg.src)
        .pipe(svgmin())
        .pipe(cheerio({
            run: function($) {
                $("[id]").removeAttr("id");
                $("[width]").removeAttr("width");
                $("[height]").removeAttr("height");
                $("[title]").removeAttr("title");
            },
            parserOptions: {
                xmlMode: true
            }
        }))
        .pipe(replace("&gt;", ">"))
        .pipe(tap(function(file, t) {
            if (path.extname(file.path) === '.svg') {
                const name = path.basename(file.path, '.svg');
                file.contents = Buffer.from(file.contents.toString().replace(/<svg/g, `<svg id="${name}"`))
            }
         }))
        .pipe(gulp.dest(paths.svg.dist))
        .pipe(
            debug({
                title: 'svg',
            })
        )
        .on('end', browsersync.reload);
});

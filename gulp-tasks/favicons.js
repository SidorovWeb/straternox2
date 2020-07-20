"use strict";

import { paths } from "../gulpfile.babel";
import gulp from "gulp";
import debug from "gulp-debug";

gulp.task("favicons", () => {
    return gulp
        .src(paths.favicons.src)
        .pipe(gulp.dest(paths.favicons.dist))
        .pipe(
            debug({
                title: "Favicons",
            })
        );
});

"use strict";

import gulp from "gulp";

const requireDir = require("require-dir"),
    paths = {
        views: {
            src: ["./src/views/index.pug", "./src/views/pages/*.pug"],
            dist: "./dist/",
            watch: ["./src/blocks/**/*.pug", "./src/views/**/*.pug"],
        },
        styles: {
            src: "./src/styles/main.{scss,sass}",
            dist: "./dist/styles/",
            watch: ["./src/blocks/**/*.{scss,sass}", "./src/styles/**/*.{scss,sass}"],
        },
        scripts: {
            src: "./src/js/index.js",
            dist: "./dist/js/",
            watch: ["./src/blocks/**/*.js", "./src/js/**/*.js"],
        },
        images: {
            src: ["./src/img/**/*.{jpg,jpeg,png,gif,tiff}", "!./src/img/favicon/*.{jpg,jpeg,png,gif,tiff}"],
            dist: "./dist/img/",
            watch: "./src/img/**/*.{jpg,jpeg,png,gif}",
        },
        webp: {
            src: ["./src/img/**/*.{jpg,jpeg,png,tiff}", "!./src/img/favicon/*.{jpg,jpeg,png,gif}"],
            dist: "./dist/img/",
            watch: ["./src/img/**/*.{jpg,jpeg,png,tiff}", "!./src/img/favicon.{jpg,jpeg,png,gif}"],
        },
        svg: {
            src: "./src/img/svg/*.svg",
            dist: "./dist/img/svg/",
            watch: "./src/img/svg/*.svg",
        },
        fonts: {
            src: "./src/fonts/**/*.{woff,woff2}",
            dist: "./dist/fonts/",
            watch: "./src/fonts/**/*.{woff,woff2}",
        },
        favicons: {
            src: "./src/img/favicon/*.{jpg,jpeg,png,gif,tiff}",
            dist: "./dist/img/favicons/",
        },
        gzip: {
            src: "./src/.htaccess",
            dist: "./dist/",
        },
    };

requireDir("./gulp-tasks/");

export { paths };

export const development = gulp.series(
    "clean",
    gulp.parallel(["views", "styles", "scripts", "images", "webp", "svg", "fonts", "favicons"]),
    gulp.parallel("serve")
);

export const prod = gulp.series(
    "clean",
    gulp.series(["views", "styles", "scripts", "images", "webp", "svg", "fonts", "favicons", "gzip"])
);

export default development;

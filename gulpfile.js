import gulp from "gulp";
import gulpSass from "gulp-sass";
import autoprefixer from "gulp-autoprefixer";
import browserSync from "browser-sync";
const bs = browserSync.create();

import * as sassLib from "sass";

const sass = gulpSass(sassLib);

function compilaSass() {
  return gulp
    .src("assets/css/scss/**/*.scss")
    .pipe(sass())
    .pipe(
      autoprefixer({
        cascade: false,
      })
    )
    .pipe(gulp.dest("./"));
}

gulp.task("sass", compilaSass);

function watch() {
  compilaSass();
  bs.init({
    server: "./", // ou a pasta onde está o index.html
  });
  gulp.watch("assets/css/scss/**/*.scss", compilaSass).on("change", bs.reload);
  gulp.watch("*.html").on("change", bs.reload);
}

gulp.task("watch", watch);

gulp.task("default", gulp.parallel("watch"));

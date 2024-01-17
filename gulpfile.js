import gulp from "gulp";
import gulpSass from "gulp-sass";
import autoprefixer from "gulp-autoprefixer";

import sassLib from "sass";

const sass = gulpSass(sassLib);

function compilaSass() {
  return gulp
    .src("assets/css/scss/**/*.scss")
    .pipe(sass())
    .pipe(
      autoprefixer({
        browsers: ["last 2 versions"],
        cascade: false,
      })
    )
    .pipe(gulp.dest("./"));
}

gulp.task("sass", compilaSass);

function watch() {
  compilaSass();
  gulp.watch("assets/css/scss/**/*.scss", compilaSass);
}

gulp.task("watch", watch);

gulp.task("default", gulp.parallel("watch"));
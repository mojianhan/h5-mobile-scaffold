const { resolve } = require('path')
const gulp = require('gulp')
const cleanCSS = require('gulp-clean-css')
const config = require('../.tplconfig')

gulp.task('minify-css', () => {
  return gulp.src(resolve(__dirname, '..', config.srcRoot, '**/*.css'))
    .pipe(cleanCSS({
      compatibility: 'ie8'
    }))
    .pipe(gulp.dest(config.distRoot))
})

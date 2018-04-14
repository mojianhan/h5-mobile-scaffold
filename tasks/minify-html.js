const { resolve } = require('path')
const gulp = require('gulp')
const htmlmin = require('gulp-htmlmin')
const config = require('../.tplconfig')

gulp.task('minify-html', () => {
  return gulp.src(resolve(__dirname, '..', config.srcRoot, '**/*.html'))
    .pipe(htmlmin({
      collapseWhitespace: true,
      collapseInlineTagWhitespace: true,
      collapseBooleanAttributes: true,
      minifyCSS: true,
      minifyJS: true,
      removeAttributeQuotes: true,
      removeComments: true,
      removeEmptyAttributes: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true
    }))
    .pipe(gulp.dest(config.distRoot))
})

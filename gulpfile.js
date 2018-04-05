const gulp = require('gulp')
const htmlmin = require('gulp-htmlmin')
const cleanCSS = require('gulp-clean-css')
const uglify = require('gulp-uglify')
const imagemin = require('gulp-imagemin')
const pump = require('pump')
const config = require('./.tplconfig')

gulp.task('minify-html', () => {
  return gulp.src('src/**/*.html')
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

gulp.task('minify-css', () => {
  return gulp.src('src/**/*.css')
    .pipe(cleanCSS({
      compatibility: 'ie8'
    }))
    .pipe(gulp.dest(config.distRoot))
})

gulp.task('minify-js', (cb) => {
  pump([
      gulp.src('src/**/*.js'),
      uglify(),
      gulp.dest(config.distRoot)
    ],
    cb
  )
})

gulp.task('copy', () => {
  const files = [
    'src/**/*.png',
    'src/**/*.ico'
  ]
  return gulp.src(files)
    .pipe(imagemin())
    .pipe(gulp.dest(config.distRoot))
})

gulp.task('default', [ 'minify-html', 'minify-css', 'minify-js', 'copy' ])

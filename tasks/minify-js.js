const { resolve } = require('path')
const gulp = require('gulp')
const pump = require('pump')
const uglify = require('gulp-uglify')
const config = require('../.tplconfig')

gulp.task('minify-js', (cb) => {
  pump(
    [
      gulp.src(resolve(__dirname, '..', config.srcRoot, '**/*.js')),
      uglify(),
      gulp.dest(config.distRoot)
    ],
    cb
  )
})

const { join, resolve, extname } = require('path')
const babel = require('babel-core')
const fs = require('fs')
const gulp = require('gulp')
const bs = require('browser-sync')
const config = require('../.tplconfig')

gulp.task('server', () => {
  const rootDir = resolve(__dirname, '..', config.srcRoot)

  bs.init({
    serveStatic: [ rootDir ],
    proxy: 'http://127.0.0.1:3333',
    open: false,
    port: 8686,
    files: [ resolve(rootDir, '**/*') ],
    middleware: [
      (req, res, next) => {
        const myExtname = (extname(req.url).match(/\.(.*)$/) || [ '', '' ])[1]
        const reqFile = join(rootDir, myExtname ? req.url : 'index.html')

        let content = ''
        let option = {}

        switch (myExtname) {
          case 'js':
            res.setHeader('Content-Type', 'application/javascript')
            option = { sourceMaps: 'inline' }
            content = babel.transformFileSync(reqFile.replace('js', config.jsExtname), option).code
            break

          // no default
        }

        res.end(content)
      }
    ]
  })
})

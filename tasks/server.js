const { join, resolve, extname } = require('path')
const fs = require('fs')
const gulp = require('gulp')
const bs = require('browser-sync')
const config = require('../.tplconfig')

gulp.task('server', () => {
  const rootDir = resolve(__dirname, '..', config.srcRoot)

  bs.init({
    server: rootDir,
    open: false,
    port: 8888,
    files: [ resolve(rootDir, '**/*') ],
    middleware: [
      (req, res, next) => {
        const myExtname = (extname(req.url).match(/\.(.*)$/) || [ '', '' ])[1]
        const reqFile = join(rootDir, myExtname ? req.url : 'index.html')

        let content = ''

        switch (myExtname) {
          case '':
          case 'html':
            res.setHeader('Content-Type', 'text/html')
            content = fs.readFileSync(reqFile)
            break

          case 'css':
            res.setHeader('Content-Type', 'text/css')
            content = fs.readFileSync(reqFile)
            break

          case 'js':
            res.setHeader('Content-Type', 'application/javascript')
            content = fs.readFileSync(reqFile)
            break

          default:
            content = fs.readFileSync(reqFile)
            break
        }

        res.end(content)
      }
    ]
  })
})

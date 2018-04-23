const { join, resolve, extname, dirname } = require('path')
const babel = require('babel-core')
const pug = require('pug')
const stylus = require('stylus')
const nib = require('nib')
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
    ignore: config.ignoreDirs.map(ignoreDir => resolve(rootDir, ignoreDir)),
    middleware: [
      (req, res, next) => {
        const reqFile = join(rootDir, extname(req.url) ? req.url : 'index.html')
        const myExtname = (extname(reqFile).match(/\.(.*)$/) || [ '', '' ])[1]

        let content = ''
        let option = {}

        switch (myExtname) {
          case 'html':
            res.setHeader('Content-Type', 'text/html')

            option = {
              pretty: true
            }

            content = pug.renderFile(reqFile.replace('html', config.htmlExtName), option)
            break

          case 'css':
            res.setHeader('Content-Type', 'text/css')

            content = stylus(fs.readFileSync(reqFile.replace('css', config.cssExtName), 'utf8'))
              .set('paths', [ dirname(reqFile) ])
              .set('include css', true)
              .use(nib())
              .import('nib')
              .render()
            break

          case 'js':
            res.setHeader('Content-Type', 'application/javascript')

            option = {
              sourceMaps: 'inline'
            }

            content = babel.transformFileSync(reqFile.replace('js', config.jsExtName), option).code
            break

          // no default
        }

        res.end(content)
      }
    ]
  })
})

const {series, crossEnv, concurrent, rimraf} = require('nps-utils')
const {config: {port : E2E_PORT}} = require('./test/protractor.conf')

module.exports = {
  scripts: {
    default: 'nps webpack',
    transpile: series(
      rimraf('dist'),
      crossEnv('NODE_ENV=production babel src -d dist'),
      'node-sass src/styles.scss dist/styles.css --output-style compressed'
    ),
    test: {
      default: 'nps test.jest',
      jest: {
        default: crossEnv('BABEL_TARGET=node jest'),
        watch: crossEnv('BABEL_TARGET=node jest --watch'),
      },
      karma: {
        default: series(
          rimraf('test/karma-coverage'),
          'karma start test/karma.conf.js'
        ),
        watch: 'karma start test/karma.conf.js --single-run=false',
        debug: 'karma start test/karma.conf.js --single-run=false --debug'
      },
      all: concurrent({
        browser: series.nps('test.karma', 'e2e'),
        jest: 'nps test.jest',
      })
    },
    e2e: {
      default: concurrent({
        webpack: `webpack-dev-server --inline --port=${E2E_PORT}`,
        protractor: 'nps e2e.whenReady',
      }) + ' --kill-others --success first',
      protractor: {
        install: 'webdriver-manager update',
        default: series(
          'nps e2e.protractor.install',
          'protractor test/protractor.conf.js'
        ),
        debug: series(
          'nps e2e.protractor.install',
          'protractor test/protractor.conf.js --elementExplorer'
        ),
      },
      whenReady: series(
        `wait-on --timeout 120000 http-get://localhost:${E2E_PORT}/index.html`,
        'nps e2e.protractor'
      ),
    },
    webpack: {
      default: 'nps webpack.server',
      server: {
        default: `webpack-dev-server -d --devtool '#eval' --inline --env.server`,
        extractCss: `webpack-dev-server -d --devtool '#eval' --inline --env.server --env.extractCss`,
        hmr: `webpack-dev-server -d --devtool '#eval' --inline --hot --env.server`
      }
    },
    serve: 'http-server dist --cors',
  },
}

module.exports = {
  "plugins": [
    "transform-decorators-legacy",
    "transform-class-properties"
  ],
  "presets": [
    [
      "env", {
        "targets": process.env.BABEL_TARGET === 'node' ? {
          "node": "current"
        } : {
          "browsers": [
            "last 2 versions",
            "not ie <= 11"
          ],
          "uglify": process.env.NODE_ENV === 'production',
        },
        "loose": true,
        "modules": process.env.BABEL_TARGET === 'node' ? 'commonjs' : false,
        "useBuiltIns": "usage"
      }
    ]
  ],
  "ignore": process.env.NODE_ENV === 'production' ? [
    "**/*.test.js"
  ] : []
}
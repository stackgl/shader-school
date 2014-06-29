var path = require('path')

module.exports = function(sourceFiles) {
  var glslify = ['-t', require.resolve('glslify')]
  var live    = ['-t', require.resolve('glslify-live')]
  var brfs    = ['-t', require.resolve('brfs')]
  var envify  = ['-t', '[', require.resolve('envify')]

  sourceFiles.forEach(function(file) {
    var base = path.basename(file).replace(/\./g, '_')
    envify.push('--file_' + base)
    envify.push(file)
  })

  envify.push(']')

  return require('beefy')({
      cwd: __dirname
    , entries: ['index.js']
    , quiet: false
    , live: false
    , debug: false
    , watchify: false
    , bundlerFlags: []
      .concat(envify)
      .concat(live)
      .concat(glslify)
      .concat(brfs)
  })
}

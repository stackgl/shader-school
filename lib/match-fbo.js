var matching = require('gl-fbo-matching')

module.exports = matchFBO

function matchFBO(comparison, min) {
  min = min || 0.99

  return function test(done) {
    comparison.run()

    var similarity = matching(
        comparison.actual.fbo
      , comparison.expected.fbo
      , 0.05
    )

    for (var i = 0; i < 3; i++) {
      if (similarity[i] < min) {
        return done(null, false)
      }
    }

    return done(null, true)
  }
}

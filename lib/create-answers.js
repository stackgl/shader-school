var exercises = require('../exercises.json')
var inquirer  = require('inquirer')
var wordwrap  = require('wordwrap')
var mkdirp    = require('mkdirp')
var chalk     = require('chalk')
var path      = require('path')
var fs        = require('fs')

exercises = Object.keys(exercises).map(function(key) {
  return exercises[key]
})

module.exports = createAnswers

function createAnswers(root, done) {
  var counter = 0

  inquirer.prompt([{
      'type': 'confirm'
    , 'name': 'ok'
    , 'default': true
    , 'message': wordwrap(4, 80)(
      "We're about to populate this directory with some code for you to " +
      "use for your answers. If they've already been created then don't worry, " +
      "they won't be replaced. Continue?"
    ).replace(/^\s+/, '')
  }], function(result) {
    if (!result.ok) return process.exit(1)
    console.error()

    exercises.forEach(createExercise)
    if (!counter) return done && done()
  })

  function createExercise(subdir) {
    var dst = path.resolve(root, subdir)
    var src = path.resolve(__dirname, '../exercises/' + subdir + '/files')

    mkdirp.sync(dst)
    mkdirp.sync(src)
    fs.readdirSync(src).forEach(function(name) {
      if (fs.existsSync(path.join(dst, name))) return

      counter++

      fs.createReadStream(path.join(src, name))
        .pipe(fs.createWriteStream(path.join(dst, name)))
        .once('close', function() {
          var filepath = path.join(path.basename(src), name)
          console.error(chalk.grey('created: ') + chalk.cyan(filepath))
          if (!--counter) return done && done()
        })
    })
  }
}

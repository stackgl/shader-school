var ls = window.localStorage

module.exports = getProgress
module.exports.set = setProgress
module.exports.get = getProgress

function getProgress(name) {
  return name && !!ls.getItem('progress:' + name)
}

function setProgress(name, value) {
  return name && ls.setItem('progress:' + name, !!value ? '1' : '')
}

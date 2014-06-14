var domify = require('domify')

module.exports = function(html) {
  var div = document.createElement('div')

  div.innerHTML = html
  div.classList.add('glslify-description')
  div.classList.add('enabled')

  var visible = true
  var toggle = div.appendChild(domify(
    '<div class="glslify-description-toggle"></div>'
  ))

  toggle.addEventListener('click', function(e) {
    if (visible = !visible) {
      div.classList.add('enabled')
    } else {
      div.classList.remove('enabled')
    }
  }, false)

  return div
}

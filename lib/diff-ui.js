var findup = require('findup-element')
var mpos   = require('mouse-position')
var css    = require('insert-css')
var domify = require('domify')
var slice  = require('sliced')
var clamp  = require('clamp')
var fs     = require('fs')

module.exports = DiffUI

function DiffUI(compare) {
  if (!(this instanceof DiffUI)) return new DiffUI(compare)

  var el = this.el = document.body.appendChild(
    domify(fs.readFileSync(
      __dirname + '/diff-ui.html', 'utf8'
    ))
  )

  var buttons = slice(el.querySelectorAll('ul > li'))
  var slider = el.querySelector('.diff-slider-inner')
  var outerSlider = el.querySelector('.diff-slider')
  var mouse = mpos(slider, window)
  var sliding = false

  mouse.on('move', function() {
    if (!sliding) return
    var slide = clamp(mouse.x / 300, 0, 1)
    compare.amount = slide
    slider.style.width = slide * 100 + '%'
  })

  outerSlider.addEventListener('mousedown', function(e) {
    sliding = true
  }, false)

  window.addEventListener('mouseup', function(e) {
    sliding = false
  }, false)

  el.addEventListener('click', function(e) {
    var button = findup(e.target, 'li')
    if (!button) return

    var mode = button.getAttribute('data-mode')
    if (mode) return select(mode)
  }, false)

  select('slide')
  function select(mode) {
    compare.mode = mode

    buttons.forEach(function(button) {
      button.classList.remove('selected')
    })

    el.querySelector('[data-mode="'+mode+'"]')
      .classList
      .add('selected')
  }
}

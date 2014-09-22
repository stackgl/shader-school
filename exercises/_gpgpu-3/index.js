var mouse        = require('mouse-position')()
var triangle     = require('a-big-triangle')
var throttle     = require('frame-debounce')
var fit          = require('canvas-fit')
var getContext   = require('gl-context')
var compare      = require('gl-compare')
var ndarray      = require('ndarray')
var createShader = require('glslify')
var createFBO    = require('gl-fbo')
var fs           = require('fs')

var container  = document.getElementById('container')
var canvas     = container.appendChild(document.createElement('canvas'))
var readme     = fs.readFileSync(__dirname + '/README.md', 'utf8')
var gl         = getContext(canvas, render)
var comparison = compare(gl
  , createLoop('actual')
  , createLoop('expected')
)

comparison.mode = 'slide'
comparison.amount = 0.5

require('../common')({
    description: readme
  , compare: comparison
  , canvas: canvas
  , dirname: process.env.dirname
})

window.addEventListener('resize', fit(canvas), false)

var speed = 5
var scale = 3
var n     = 0

function render() {
  if (!(n = (n+1) % speed)) comparison.run()
  comparison.render()
}

var shaders = {
  actual: {
    logic: createShader({
        frag: process.env.file_logic_frag
      , vert: './shaders/triangle.vert'
    })(gl),
    render: createShader({
        frag: process.env.file_render_frag
      , vert: './shaders/triangle.vert'
    })(gl)
  },
  expected: {
    logic: createShader({
        frag: './shaders/logic_solution.frag'
      , vert: './shaders/triangle.vert'
    })(gl),
    render: createShader({
        frag: './shaders/render_solution.frag'
      , vert: './shaders/triangle.vert'
    })(gl)
  }
}

var data = randomFill()
var outputs = {
    actual: start(createFBO(gl, [512, 512]), data)
  , expected: start(createFBO(gl, [512, 512]), data)
}

var inputs = {
    actual: start(createFBO(gl, [512, 512]), data)
  , expected: start(createFBO(gl, [512, 512]), data)
}

function createLoop(key) {
  return function render(fbo) {
    var height = (canvas.height / scale)|0
    var width  = (canvas.width / scale)|0

    outputs[key].shape = [height, width]
    outputs[key].bind()
    shaders[key].logic.bind()
    shaders[key].logic.uniforms.uTexture = inputs[key].color[0].bind(0)
    shaders[key].logic.uniforms.uUnitSize = [width, height]
    triangle(gl)

    fbo.shape = [height, width]
    fbo.bind()
    shaders[key].render.bind()
    shaders[key].render.uniforms.uTexture = outputs[key].color[0].bind(0)
    triangle(gl)

    var tmp = inputs[key]
    inputs[key] = outputs[key]
    outputs[key] = tmp
  }
}

function start(fbo, data) {
  fbo.shape = data.shape.slice(0, -1)
  fbo.color[0].setPixels(data)

  return fbo
}

function randomFill() {
  var shape = [window.innerHeight, window.innerWidth]
  var data  = new Uint8Array(shape[0] * shape[1] * 4)
  var i = 0

  while (i < data.length) {
    data[i++] = Math.random() * 256
    data[i++] = 0
    data[i++] = 0
    data[i++] = 1
  }

  return ndarray(data, shape.concat(4))
}

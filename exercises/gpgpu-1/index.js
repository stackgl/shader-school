var mouse        = require('mouse-position')()
var triangle     = require('a-big-triangle')
var throttle     = require('frame-debounce')
var fit          = require('canvas-fit')
var getContext   = require('gl-context')
var compare      = require('gl-compare')
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

function render() {
  comparison.run()
  comparison.render()
}

var shaders = {
  actual: createShader({
      frag: process.env.file_render_frag
    , vert: './shaders/triangle.vert'
  })(gl),
  expected: createShader({
      frag: './shaders/expected.frag'
    , vert: './shaders/triangle.vert'
  })(gl),
  display: createShader({
      frag: './shaders/display.frag'
    , vert: './shaders/triangle.vert'
  })(gl)
}

var outputs = {
    actual: createFBO(gl, [512, 512])
  , expected: createFBO(gl, [512, 512])
}

var inputs = {
    actual: createFBO(gl, [512, 512])
  , expected: createFBO(gl, [512, 512])
}

function createLoop(key) {
  return function render(fbo) {
    outputs[key].shape = [canvas.height, canvas.width]
    outputs[key].bind()
    shaders[key].bind()
    shaders[key].uniforms.uTexture = inputs[key].color[0].bind(0)
    shaders[key].uniforms.uMouse = [mouse.x, canvas.height - mouse.y]
    triangle(gl)

    fbo.shape = [canvas.height, canvas.width]
    fbo.bind()
    shaders.display.bind()
    shaders.display.uniforms.uTexture = outputs[key].color[0].bind(0)
    triangle(gl)

    var tmp = inputs[key]
    inputs[key] = outputs[key]
    outputs[key] = tmp
  }
}

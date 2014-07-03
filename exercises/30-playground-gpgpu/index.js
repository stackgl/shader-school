var matchFBO     = require('../../lib/match-fbo')
var mouse        = require('mouse-position')()
var mouseDown    = require('mouse-pressed')(null, true)
var triangle     = require('a-big-triangle')
var throttle     = require('frame-debounce')
var fit          = require('canvas-fit')
var getContext   = require('gl-context')
var compare      = require('gl-compare')
var ndarray      = require('ndarray')
var createShader = require('glslify')
var createFBO    = require('gl-fbo')
var fs           = require('fs')
var now          = require('right-now')

var container  = document.getElementById('container')
var canvas     = container.appendChild(document.createElement('canvas'))
var readme     = fs.readFileSync(__dirname + '/README.md', 'utf8')
var gl         = getContext(canvas, tick)
var comparison = compare(gl, render, render)
var tickCount  = 0
var numBuffers = 3

require('../common')({
    description: readme
  , canvas: canvas
  , compare: comparison
  , dirname: process.env.dirname
})

window.addEventListener('resize', fit(canvas), false)
var renderShader = createShader({
    frag: process.env.file_render_glsl
  , vert: './shaders/pass-thru.glsl'
})(gl)

var updateShader = createShader({
    frag: process.env.file_update_glsl
  , vert: './shaders/pass-thru.glsl'
})(gl)

var buffers = new Array(numBuffers)
for(var i=0; i<numBuffers; ++i) {
  buffers[i] = createFBO(gl, [512,512], {float: true})
}

var t

function render() {
  var nshape = [canvas.height, canvas.width]
  var mousePos = [ mouse.x, canvas.height-mouse.y-1 ]
  var mouseState = [ mouseDown.left, mouseDown.middle, mouseDown.right ]
  var front   = buffers[tickCount%buffers.length]
  var back0   = buffers[(tickCount+buffers.length-1)%buffers.length]
  var back1   = buffers[(tickCount+buffers.length-2)%buffers.length]

  gl.bindFramebuffer(gl.FRAMEBUFFER, null)
  gl.viewport(0, 0, canvas.width, canvas.height)
  renderShader.bind()
  renderShader.uniforms.state = [ front.color[0].bind(0), back0.color[0].bind(1), back1.color[0].bind(2) ]
  renderShader.uniforms.screenSize = [ canvas.width, canvas.height ]
  renderShader.uniforms.mousePosition = mousePos
  renderShader.uniforms.mouseDown = mouseState
  renderShader.uniforms.time = t

  triangle(gl)

}

function update() {
  t = 0.001 * now()

  tickCount = tickCount + 1
  var nshape = [canvas.height, canvas.width]
  for(var i=0; i<numBuffers; ++i) {
    buffers[i].shape = nshape
  }

  var front   = buffers[tickCount%buffers.length]
  var back0   = buffers[(tickCount+buffers.length-1)%buffers.length]
  var back1   = buffers[(tickCount+buffers.length-2)%buffers.length]

  var mousePos   = [ mouse.x, canvas.height-mouse.y-1 ]
  var mouseState = [ mouseDown.left, mouseDown.middle, mouseDown.right ]

  //Apply update
  front.bind()

  //Apply transformation
  updateShader.bind()
  updateShader.uniforms.state = [ back0.color[0].bind(0), back1.color[0].bind(1) ]
  updateShader.uniforms.screenSize = [ canvas.width, canvas.height ]
  updateShader.uniforms.mousePosition = mousePos
  updateShader.uniforms.mouseDown = mouseState
  updateShader.uniforms.time = t
  triangle(gl)
}

function tick() {
  update()
  render()
}

var mouse        = require('mouse-position')()
var triangle     = require('a-big-triangle')
var throttle     = require('frame-debounce')
var fit          = require('canvas-fit')
var getContext   = require('gl-context')
var compare      = require('gl-compare')
var createTexture= require('gl-texture2d')
var createShader = require('glslify')
var fs           = require('fs')
var baboon       = require('baboon-image')
var now          = require('right-now')

var container  = document.getElementById('container')
var canvas     = container.appendChild(document.createElement('canvas'))
var readme     = fs.readFileSync(__dirname + '/README.md', 'utf8')
var gl         = getContext(canvas, render)
var comparison = compare(gl, actual, expected)

comparison.mode = 'slide'
comparison.amount = 0.5

require('../common')({
    description: readme
  , compare: comparison
  , canvas: canvas
})

window.addEventListener('resize', fit(canvas), false)

var baboonTexture = createTexture(gl, baboon.step(-1,1))
baboonTexture.wrap = gl.REPEAT

var actualShader = createShader({
    frag: process.env.file_fragment_glsl
  , vert: './shaders/vertex.glsl'
})(gl)

var expectedShader = createShader({
    frag: './shaders/fragment.glsl'
  , vert: './shaders/vertex.glsl'
})(gl)

var tick

function render() {
  tick = 0.00025 * now()
  comparison.run()
  comparison.render()
}

function actual(fbo) {
  fbo.shape = [canvas.height, canvas.width]
  fbo.bind()
  actualShader.bind()
  actualShader.uniforms = {
    texture: baboonTexture.bind(),
    screenSize: [canvas.width, canvas.height],
    theta: Math.atan2(mouse.y - canvas.height/2, mouse.x - canvas.width/2),
    center: [0.5 - 0.15 * Math.cos(2 * tick + 0.3), 0.5 - 0.15 * Math.sin(3 * tick )]
  }
  triangle(gl)
}

function expected(fbo) {
  fbo.shape = [canvas.height, canvas.width]
  fbo.bind()
  expectedShader.bind()
  expectedShader.uniforms = {
    texture: baboonTexture.bind(),
    screenSize: [canvas.width, canvas.height],
    theta: Math.atan2(mouse.y - canvas.height/2, mouse.x - canvas.width/2),
    center: [0.5 - 0.15 * Math.cos(2 * tick + 0.3), 0.5 - 0.15 * Math.sin(3 * tick )]
  }
  triangle(gl)
}
var matchFBO     = require('../../lib/match-fbo')
var drawTriangle = require('a-big-triangle')
var throttle     = require('frame-debounce')
var fit          = require('canvas-fit')
var getContext   = require('gl-context')
var compare      = require('gl-compare')
var createShader = require('gl-shader')
var glslify      = require('glslify')
var now          = require('right-now')
var fs           = require('fs')

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
  , test: matchFBO(comparison, 0.99)
  , dirname: process.env.dirname
})

window.addEventListener('resize', fit(canvas), false)

var actualShader = createShader(gl
  , glslify("attribute vec2 uv;void main() {gl_Position = vec4(uv,0,1);}", {inline: true})
  , glslify([
"precision mediump float;",
"uniform vec2 screenSize, boxLo, boxHi;",
"#pragma glslify: inBox=require(" + process.env.file_box_glsl + ")",
"void main() {",
  "vec2 q = (gl_FragCoord.xy / screenSize);",
  "if(inBox(boxLo, boxHi, q)) {",
    "gl_FragColor = vec4(1,1,1,1);",
  "} else {",
    "gl_FragColor = vec4(0,0,0,1);",
  "}",
"}"].join("\n"), {inline: true}))

var expectedShader = createShader(gl
  , glslify('./shaders/vertex.glsl')
  , glslify('./shaders/fragment.glsl'))

var boxLo = [0,0]
var boxHi = [0,0]

function render() {
  var t = 0.0001 * now()
  boxLo = [ 0.5*(1.0-0.8*Math.cos(2*t)), 0.5*(1.0+0.8*Math.cos(t + 1.37)) ]
  boxHi = [ boxLo[0] + 0.25*(1.0+0.8*Math.cos(0.9*t + 7)), boxLo[1]+0.25*(1.0+0.8*Math.cos(3*t - 1)) ]

  comparison.run()
  comparison.render()
}

function actual(fbo) {
  fbo.shape = [canvas.height, canvas.width]
  fbo.bind()
  actualShader.bind()
  actualShader.uniforms.screenSize = [canvas.width, canvas.height]
  actualShader.uniforms.boxLo = boxLo
  actualShader.uniforms.boxHi = boxHi
  drawTriangle(gl)
}

function expected(fbo) {
  fbo.shape = [canvas.height, canvas.width]
  fbo.bind()
  expectedShader.bind()
  expectedShader.uniforms.screenSize = [canvas.width, canvas.height]
  expectedShader.uniforms.boxLo = boxLo
  expectedShader.uniforms.boxHi = boxHi
  drawTriangle(gl)
}

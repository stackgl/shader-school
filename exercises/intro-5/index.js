var matchFBO     = require('../../lib/match-fbo')
var drawTriangle = require('a-big-triangle')
var throttle     = require('frame-debounce')
var fit          = require('canvas-fit')
var getContext   = require('gl-context')
var compare      = require('gl-compare')
var createShader = require('glslify')
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
  , dirname: process.env.dirname
  , compare: comparison
  , canvas: canvas
  , test: matchFBO(comparison, 0.99)
})

window.addEventListener('resize', fit(canvas), false)

var actualShader = createShader({
  vertex: "attribute vec2 uv;void main() {gl_Position = vec4(uv,0,1);}",
  fragment: [
"precision highp float;",
"uniform vec2 screenSize;",
"#pragma glslify: fractal=require(" + process.env.file_mandelbrot_glsl + ")",
"void main() {",
  "vec2 q = 2.0 * (gl_FragCoord.xy / screenSize) - vec2(1.0,1.0);",
  "q.x *= screenSize.x / screenSize.y;",
  "q.x -= 0.5;",
  "vec4 color = vec4(0,0,0,1);",
  "if(fractal(q)) {",
    "color = vec4(1,1,1,1);",
  "}",
  "gl_FragColor = color;",
"}"].join("\n"),
  inline: true
})(gl)


var expectedShader = createShader({
    frag: './shaders/fragment.glsl'
  , vert: './shaders/vertex.glsl'
})(gl)

function render() {
  comparison.run()
  comparison.render()
}

function actual(fbo) {
  fbo.shape = [canvas.height, canvas.width]
  fbo.bind()
  actualShader.bind()
  actualShader.uniforms.screenSize = [canvas.width, canvas.height]
  drawTriangle(gl)
}

function expected(fbo) {
  fbo.shape = [canvas.height, canvas.width]
  fbo.bind()
  expectedShader.bind()
  expectedShader.uniforms.screenSize = [canvas.width, canvas.height]
  drawTriangle(gl)
}
var matchFBO     = require('../../lib/match-fbo')
var drawTriangle = require('a-big-triangle')
var throttle     = require('frame-debounce')
var fit          = require('canvas-fit')
var getContext   = require('gl-context')
var compare      = require('gl-compare')
var createTexture= require('gl-texture2d')
var baboon       = require('baboon-image')
var createShader = require('glslify')
var now          = require('right-now')
var fs           = require('fs')

var container  = document.getElementById('container')
var canvas     = container.appendChild(document.createElement('canvas'))
var readme     = fs.readFileSync(__dirname + '/README.md', 'utf8')
var gl         = getContext(canvas, render)
var comparison = compare(gl, actual, expected)
var baboonTexture = createTexture(gl, baboon)

baboonTexture.wrap = gl.REPEAT
baboonTexture.magFilter = gl.NEAREST
baboonTexture.minFilter = gl.NEAREST

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

var actualShader = createShader({
  vertex: [
'precision highp float;',
'#pragma glslify: matrixPower = require('+process.env.file_mpow_glsl+')',
'attribute vec2 position;',
'uniform int n;',
'uniform mat2 mat;',
'varying vec2 coord;',
'void main() {',
  'gl_Position = vec4(position, 0, 1);',
  'vec2 textureCoordinate = vec2(0.5,0.5) - 0.5 * position;',
  'coord = matrixPower(mat, n) * textureCoordinate;',
'}'].join('\n'),
  fragment: [
'precision highp float;',
'uniform sampler2D texture;',
'varying vec2 coord;',
'void main() {',
  'gl_FragColor = texture2D(texture, coord);',
'}'].join('\n'),
  inline: true
})(gl)

var expectedShader = createShader({
    frag: './shaders/fragment.glsl'
  , vert: './shaders/vertex.glsl'
})(gl)

var count = 0

setInterval(function() {
  count = (count + 1) % 15
}, 800)

function render() {
  comparison.run()
  comparison.render()
}

function actual(fbo) {
  fbo.shape = [canvas.height, canvas.width]
  fbo.bind()
  actualShader.bind()
  actualShader.uniforms.texture = baboonTexture.bind()
  actualShader.uniforms.n = count
  actualShader.uniforms.mat = [2, 1, 1, 1]
  drawTriangle(gl)
}

function expected(fbo) {
  fbo.shape = [canvas.height, canvas.width]
  fbo.bind()
  expectedShader.bind()
  expectedShader.uniforms.texture = baboonTexture.bind()
  expectedShader.uniforms.n = count
  expectedShader.uniforms.mat = [2, 1, 1, 1]
  drawTriangle(gl)
}
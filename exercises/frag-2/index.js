var mouse        = require('mouse-position')()
var dist         = require('ndarray-distance')
var ndarray      = require('ndarray')
var triangle     = require('a-big-triangle')
var throttle     = require('frame-debounce')
var fit          = require('canvas-fit')
var getContext   = require('gl-context')
var compare      = require('gl-compare')
var createFBO    = require('gl-fbo')
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
var verifyFBO   = createFBO(gl, [512, 512])

//Test data
var testCenter = [
  [0,0],
  [0.25, 0],
  [0, 0.25],
  [-0.25, 0],
  [0, 0.25],
  [0.5, 0.5]
]
var testAngle = [
  0,
  Math.PI,
  Math.PI/2.0,
  Math.PI/4.0,
  9.0,
  0.123,
  2.0 * Math.PI,
  -Math.PI
]

comparison.mode = 'slide'
comparison.amount = 0.5

require('../common')({
    description: readme
  , dirname: process.env.dirname
  , compare: comparison
  , canvas: canvas
  , test: verify
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

function verify(cb) {
  process.nextTick(function() {
    var buffer0 = new Uint8Array(512*512*4)
    var buffer1 = new Uint8Array(512*512*4)
    verifyFBO.bind()
    for(var i=0; i<testAngle.length; ++i) {
      var theta = testAngle[i]
      for(var j=0; j<testCenter.length; ++j) {
        var center = testCenter[j]

        //Draw actual shader contents
        gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT)
        actualShader.bind()
        actualShader.uniforms = {
          texture: baboonTexture.bind(),
          screenSize: [512, 512],
          theta: theta,
          center: center
        }
        triangle(gl)
        gl.readPixels(0, 0, 512, 512, gl.RGBA, gl.UNSIGNED_BYTE, buffer0)

        //Draw expected pass
        gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT)
        expectedShader.bind()
        expectedShader.uniforms = {
          texture: baboonTexture.bind(),
          screenSize: [512, 512],
          theta: theta,
          center: center
        }
        triangle(gl)
        gl.readPixels(0, 0, 512, 512, gl.RGBA, gl.UNSIGNED_BYTE, buffer1)

        if(dist(ndarray(buffer0), ndarray(buffer1)) > 10.0) {
          cb(null, null)
          return
        }
      }
    }
    cb(null, "success")
    return
  })
}
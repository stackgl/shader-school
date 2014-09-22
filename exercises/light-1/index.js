var mouse        = require('mouse-position')()
var createShader = require('glslify')
var matchFBO     = require('../../lib/match-fbo')
var throttle     = require('frame-debounce')
var dragon       = require('stanford-dragon/3')
var getNormals   = require('mesh-normals')
var fit          = require('canvas-fit')
var getContext   = require('gl-context')
var compare      = require('gl-compare')
var createBuffer = require('gl-buffer')
var createVAO    = require('gl-vao')
var fs           = require('fs')
var now          = require('right-now')
var glm          = require('gl-matrix')
var mat4         = glm.mat4

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

var vertexNormals = getNormals(dragon.cells, dragon.positions, 0.1)
var vertexData = []
for(var i=0; i<dragon.cells.length; ++i) {
  var loop = dragon.cells[i]
  for(var j=0; j<loop.length; ++j) {
    vertexData.push.apply(vertexData, dragon.positions[loop[j]])
  }
}
var vertexBuffer = createBuffer(gl, vertexData)
var vertexArray = createVAO(gl, [
  {
    "buffer": vertexBuffer,
    "size": 3 
  },
  {
    "buffer": createBuffer(gl, vertexNormals),
    "size": 3
  }
])


var actualShader = createShader({
    frag: process.env.file_fragment_glsl
  , vert: process.env.file_vertex_glsl
})(gl)
actualShader.attributes.position.location = 0
//actualShader.attributes.normal.location = 1

var expectedShader = createShader({
    frag: './shaders/fragment.glsl'
  , vert: './shaders/vertex.glsl'
})(gl)

expectedShader.attributes.position.location = 0
//expectedShader.attributes.normal.location = 1

function getCamera() {
  var projection = mat4.perspective(
    mat4.create(),
    Math.PI/4.0,
    canvas.width/canvas.height,
    0.0001,
    1000.0)

  var view = mat4.lookAt(
    mat4.create(),
    [ 100.0*(1.0-2.0 * (mouse.x / canvas.width)), 60.0*(2.0 * (mouse.y / canvas.height)), 130.0 ],
    [ 0,60,0],
    [0,1,0])

  var model = mat4.create()
  //mat4.rotateY(model, model, -0.00001 * now())

  return {
    model: model,
    view: view,
    projection: projection,
    ambient: [0.25, 0.25, 0.25]
  }
}

var camera

function render() {
  camera = getCamera()
  comparison.run()
  comparison.render()
}

function actual(fbo) {
  fbo.shape = [canvas.height, canvas.width]
  fbo.bind()
  gl.clear(gl.COLOR_BUFFER_BIT)
  actualShader.bind()
  actualShader.uniforms = camera

  vertexArray.bind()
  vertexArray.draw(gl.TRIANGLES, vertexData.length / 3)
}

function expected(fbo) {
  fbo.shape = [canvas.height, canvas.width]
  fbo.bind()
  gl.clear(gl.COLOR_BUFFER_BIT)
  expectedShader.bind()
  expectedShader.uniforms = camera

  vertexArray.bind()
  vertexArray.draw(gl.TRIANGLES, vertexData.length / 3)
}
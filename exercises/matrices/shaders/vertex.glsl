precision highp float;

#pragma glslify: matrixPower = require(./expected.glsl)

attribute vec2 position;
uniform int n;
uniform mat2 mat;
varying vec2 coord;

void main() {
  gl_Position = vec4(position, 0, 1);
  vec2 textureCoordinate = vec2(0.5,0.5) - 0.5 * position;
  coord = matrixPower(mat, n) * textureCoordinate;
}
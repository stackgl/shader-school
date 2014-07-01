precision highp float;

attribute vec2 ignored;

uniform vec2 coord;
uniform float size;

void main() {
  gl_Position = vec4(coord, 0, 1);
  gl_PointSize = size;
}
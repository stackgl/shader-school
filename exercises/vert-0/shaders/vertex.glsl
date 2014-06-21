precision highp float;

uniform float theta;

attribute vec2 position;

void main() {

  float c = cos(theta);
  float s = sin(theta);

  mat2 rot = mat2(c, s, -s, c);

  gl_Position = vec4(rot * position, 0, 1.0);
}

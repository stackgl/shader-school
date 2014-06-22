precision highp float;

uniform float theta;

attribute vec2 position;

void main() {

  //TODO: rotate position by theta radians about the origin

  gl_Position = vec4(position, 0, 1.0);
}

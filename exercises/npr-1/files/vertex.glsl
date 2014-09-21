precision highp float;

attribute vec4 position, normal;
uniform mat4 model, view, projection;
uniform mat4 inverseModel, inverseView, inverseProjection;
uniform vec3 diffuse, lightDirection;
uniform float numBands;

void main() {
  gl_Position = vec4(0,0,0,1);
}

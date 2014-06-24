precision highp float;

uniform mat4 model, view, projection;
uniform mat4 inverseModel, inverseView, inverseProjection;
uniform vec3 diffuse, lightDirection;
uniform float numBands;

void main() {
  gl_FragColor = vec4(1,1,1,1);
}
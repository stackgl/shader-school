precision highp float;

attribute vec4 position, normal;

uniform mat4 model, view, projection;
uniform mat4 inverseModel, inverseView, inverseProjection;
uniform vec3 ambient, diffuse, specular, lightPosition;
uniform float shininess;

void main() {
  gl_Position = position;
}

precision highp float;

#pragma glslify: PointLight = require(./light.glsl)

attribute vec4 position, normal;

uniform mat4 model, view, projection;
uniform mat4 inverseModel, inverseView, inverseProjection;
uniform vec3 ambient;
uniform PointLight lights[4];

void main() {
  gl_Position = position;
}

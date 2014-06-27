precision highp float;

#pragma glslify: PointLight = require(./light.glsl)

uniform mat4 model, view, projection;
uniform mat4 inverseModel, inverseView, inverseProjection;
uniform vec3 ambient;
uniform PointLight lights[4];

void main() {
  gl_FragColor = vec4(1,1,1,1);
}
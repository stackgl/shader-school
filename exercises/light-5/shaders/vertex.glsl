precision mediump float;

#pragma glslify: PointLight = require(./light.glsl)

attribute vec3 position;
attribute vec3 normal;

uniform mat4 model;
uniform mat4 view;
uniform mat4 projection;

uniform mat4 inverseModel;
uniform mat4 inverseView;
uniform mat4 inverseProjection;

uniform PointLight lights[4];

varying vec3 fragNormal;
varying vec3 fragPosition;
varying vec3 lightDirection[4];

void main() {
  vec4 viewPosition = view * model * vec4(position, 1.0);
  vec4 viewNormal = vec4(normal, 0.0) * inverseModel * inverseView;
  
  for(int i=0; i<4; ++i) {
    vec4 viewLight = view * vec4(lights[i].position, 1.0);
    lightDirection[i] = viewLight.xyz - viewPosition.xyz;
  }

  gl_Position = projection * viewPosition;
  fragNormal = viewNormal.xyz;
  fragPosition = viewPosition.xyz;
}
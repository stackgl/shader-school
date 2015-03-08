precision mediump float;

attribute vec3 position;
attribute vec3 normal;

uniform mat4 model;
uniform mat4 view;
uniform mat4 projection;

uniform mat4 inverseModel;
uniform mat4 inverseView;
uniform mat4 inverseProjection;

varying vec3 fragNormal;

void main() {
  vec4 worldPosition = model * vec4(position, 1.0);
  vec4 worldNormal = vec4(normal, 0.0) * inverseModel;

  gl_Position = projection * view * worldPosition;
  fragNormal = worldNormal.xyz;
}
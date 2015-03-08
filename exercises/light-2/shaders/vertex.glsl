precision mediump float;
attribute vec3 position, normal;
uniform mat4 model, view, projection;
uniform mat4 inverseModel, inverseView, inverseProjection;
varying vec3 fragNormal;

void main() {
  vec4 worldPosition = model * vec4(position, 1.0);
  vec4 worldNormal = vec4(normal, 0.0) * inverseModel * inverseView;

  gl_Position = projection * view * worldPosition;
  fragNormal = worldNormal.xyz;
}
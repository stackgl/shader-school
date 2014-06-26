precision mediump float;

attribute vec3 position, normal;

uniform mat4 model, view, projection;
uniform mat4 inverseModel, inverseView, inverseProjection;
uniform vec3 lightPosition;
varying vec3 fragNormal, fragPosition, lightDirection;

void main() {
  vec4 viewPosition = view * model * vec4(position, 1.0);
  vec4 viewNormal = vec4(normal, 0.0) * inverseModel * inverseView;
  vec4 viewLight = view * vec4(lightPosition, 1.0);

  gl_Position = projection * viewPosition;
  fragNormal = viewNormal.xyz;
  fragPosition = viewPosition.xyz;
  lightDirection = viewLight.xyz - viewPosition.xyz;
}
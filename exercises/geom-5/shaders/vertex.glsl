precision highp float;
attribute vec3 position;

uniform mat4 view, projection;
uniform vec3 rotationVec;
uniform float theta;

vec3 rotatePoint(vec3 p, vec3 n, float theta) {
  return p * cos(theta) + cross(n, p) * sin(theta) + n * dot(p, n) * (1.0 - cos(theta));
}

void main() {
  gl_Position = projection * view * vec4(rotatePoint(position, normalize(rotationVec), theta), 1);
}
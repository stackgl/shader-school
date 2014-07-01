precision highp float;
attribute vec3 position;

uniform mat4 view, projection;
uniform vec3 planeVec;

void main() {
  gl_Position = projection * view * vec4(reflect(position, normalize(planeVec)), 1);
}
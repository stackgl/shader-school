precision highp float;

attribute vec3 position, color;
attribute float size;

uniform mat4 model, view, projection;

varying vec3 fragColor;

void main() {
  gl_Position = projection * view * model * vec4(position, 1.0);
  gl_PointSize = size;
  fragColor = color;
}

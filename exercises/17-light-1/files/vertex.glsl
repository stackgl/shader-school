precision highp float;

attribute vec4 position;
uniform mat4 model, view, projection;
uniform vec3 ambient;

void main() {
  gl_Position = position;
}

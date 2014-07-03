precision mediump float;

attribute vec2 position;

void main() {
  gl_Position = vec4(position.xy, 0.0, 1.0);
}

precision mediump float;

attribute vec2 position;
varying vec2 vUv;

void main() {
  vUv = (position.xy + 1.0) * 0.5;
  gl_Position = vec4(position.xy, 1.0, 1.0);
}

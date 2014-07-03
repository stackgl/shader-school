precision mediump float;

attribute vec2 intIndex;
varying vec2 fragIndex;
uniform sampler2D positions;
uniform sampler2D speeds;
uniform vec2 screenSize;

#define SIZE 64.0

void main() {
  vec2 currentIndex = intIndex.xy / vec2(SIZE);
  vec2 position = texture2D(positions, currentIndex).xy;
  vec2 speed    = texture2D(speeds, currentIndex).xy;

  fragIndex = currentIndex;

  gl_PointSize = abs(length(speed)) * 1500.0 + 1.0;
  gl_Position.xy = position;
  gl_Position.xy -= vec2(0.5);
  gl_Position.xy *= vec2(1.75);
  gl_Position.x *= screenSize.y / screenSize.x;
  // gl_Position.xy -= vec2(0.5);

  gl_Position.zw = vec2(1.0);
}

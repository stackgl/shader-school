precision mediump float;

uniform sampler2D positions;
uniform sampler2D speeds;

#define SIZE 64.0

void main() {
  vec2 currentIndex = gl_FragCoord.xy / vec2(SIZE);
  vec2 position = texture2D(positions, currentIndex).xy;
  vec2 speed    = texture2D(speeds, currentIndex).xy;

  position += speed;

  gl_FragColor.xy = position;
  gl_FragColor.zw = vec2(1.0);
}

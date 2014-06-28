precision mediump float;

uniform sampler2D state;
uniform vec2 screenSize;

#define LO vec4(0.1882, 0.2352, 0.2549, 1)
#define HI vec4(0.7686, 0.9764, 0.3411, 1)

void main() {
  float value = texture2D(state, gl_FragCoord.xy / screenSize).r;
  gl_FragColor = mix(LO, HI, clamp(value * 1.1 - 0.1, 0.0, 1.0));
}

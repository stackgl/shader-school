precision mediump float;

uniform sampler2D state;
uniform vec2 screenSize;

#define LO vec3(0.1921, 0.0980, 0.1764)
#define HI vec3(1.0, 0.7558, 0.8578)

void main() {
  float x = texture2D(state, gl_FragCoord.xy / screenSize).x;
  gl_FragColor = vec4(mix(LO, HI, x), 1.0);
}

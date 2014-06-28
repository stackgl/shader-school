precision mediump float;

uniform sampler2D state;
uniform vec2 screenSize;

void main() {
  gl_FragColor = texture2D(state, gl_FragCoord.xy / screenSize);
}

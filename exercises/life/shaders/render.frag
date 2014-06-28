precision mediump float;

uniform sampler2D prevState;
uniform vec2 stateSize;

void main() {
  gl_FragColor = texture2D(prevState, gl_FragCoord.xy / stateSize);
}

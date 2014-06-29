precision highp float;

uniform sampler2D prevState;
uniform vec2 stateSize;

float state(vec2 coord) {
  return texture2D(prevState, fract(coord / stateSize)).r;
}

void main() {
  vec2 coord = gl_FragCoord.xy;


  //TODO: Compute the next state for the cell at coord
  float s = state(coord);

  gl_FragColor = vec4(s,s,s, 1.0);
}

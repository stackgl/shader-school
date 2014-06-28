precision mediump float;

uniform sampler2D prevState;
uniform vec2 stateSize;

vec4 state(vec2 x) {
  return texture2D(prevState, x / stateSize);
}

void main() {
  vec2 coord = gl_FragCoord.xy;

  //TODO: Compute next state using a 5-point Laplacian stencil and the rule 

  gl_FragColor = state(gl_FragCoord.xy);
}

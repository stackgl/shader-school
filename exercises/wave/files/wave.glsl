precision mediump float;

uniform sampler2D prevState[2];
uniform vec2 stateSize;

vec4 state0(vec2 x) {
  return texture2D(prevState[0], x / stateSize);
}
vec4 state1(vec2 x) {
  return texture2D(prevState[1], x / stateSize);
}

void main() {
  vec2 coord = gl_FragCoord.xy;

  //TODO: Compute next state using a 5-point Laplacian stencil and the rule 

  gl_FragColor = state0(gl_FragCoord.xy);
}

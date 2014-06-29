precision mediump float;

uniform sampler2D prevState[2];
uniform vec2 stateSize;

float state0(vec2 x) {
  return texture2D(prevState[0], fract(x / stateSize)).r;
}
float state1(vec2 x) {
  return texture2D(prevState[1], fract(x / stateSize)).r;
}

void main() {
  vec2 coord = gl_FragCoord.xy;

  //TODO: Solve for next state using a 5-point Laplacian stencil and the explicit Euler rule

  float y = state0(coord);

  gl_FragColor = vec4(y,y,y,1);
}

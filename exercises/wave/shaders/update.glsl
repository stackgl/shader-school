precision highp float;

uniform sampler2D prevState[2];
uniform vec2 stateSize;
uniform float kdiffuse, kdamping;

float state0(vec2 x) {
  return texture2D(prevState[0], fract(x / stateSize)).r;
}
float state1(vec2 x) {
  return texture2D(prevState[1], fract(x / stateSize)).r;
}

float laplacian(vec2 x) {
  return (state0(x+vec2(-1,0)) + state0(x+vec2(1,0)) + state0(x+vec2(0,1)) + state0(x+vec2(0,-1))) - 4.0 * state0(x);
}

void main() {
  vec2 coord = gl_FragCoord.xy;

  float w = laplacian(coord);
  float p0 = state0(coord);
  float p1 = state1(coord);
  float y = (1.0 - kdamping) * (kdiffuse * w  + 2.0 * p0 - p1);

  gl_FragColor = vec4(y,y,y,y);
}

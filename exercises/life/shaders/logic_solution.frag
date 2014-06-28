precision mediump float;

uniform sampler2D prevState;
uniform vec2 stateSize;

void main() {
  vec2 vUv = gl_FragCoord.xy / stateSize;
  float s = texture2D(prevState, vUv).r;
  float n = 0.0;

  for (int i = -1; i <= 1; i++)
  for (int j = -1; j <= 1; j++) {
    vec2 coord = fract(vUv + vec2(i, j) / stateSize);
    n += texture2D(prevState, coord).r;
  }

  gl_FragColor.rgb = vec3(n > 3.0+s || n < 3.0 ? 0.0 : 1.0);
  gl_FragColor.a = 1.0;
}

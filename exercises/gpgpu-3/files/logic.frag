precision mediump float;

uniform sampler2D uTexture;
uniform vec2 uUnitSize;
varying vec2 vUv;

void main() {
  float s = texture2D(uTexture, vUv).r;
  float n = 0.0;

  for (int i = -1; i <= 1; i++)
  for (int j = -1; j <= 1; j++) {
    vec2 coord = fract(vUv + vec2(i, j) / uUnitSize);
    n += texture2D(uTexture, coord).r;
  }

  float alive = n > 3.0+s || n < 3.0 ? 0.0 : 1.0;

  gl_FragColor.rgb = vec3(alive);
  gl_FragColor.a = 1.0;
}

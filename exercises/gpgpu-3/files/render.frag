precision mediump float;

uniform sampler2D uTexture;
varying vec2 vUv;

#define BIRTH vec4(1.0, 0.8862, 0.3725, 1.0)
#define DEATH vec4(1.0, 0.4313, 0.3411, 1.0)
#define ALIVE vec4(0.3804, 0.7647, 1.0, 1.0)
#define DEAD  vec4(0.2039, 0.2117, 0.2313, 1.0)

void main() {
  gl_FragColor = texture2D(uTexture, vUv);
}

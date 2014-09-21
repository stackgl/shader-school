precision mediump float;

uniform sampler2D uTexture;
varying vec2 vUv;

#define BIRTH vec4(1.0, 0.8862, 0.3725, 1.0)
#define DEATH vec4(1.0, 0.4313, 0.3411, 1.0)
#define ALIVE vec4(0.3804, 0.7647, 1.0, 1.0)
#define DEAD  vec4(0.2039, 0.2117, 0.2313, 1.0)

void main() {
  vec3 data = texture2D(uTexture, vUv).rgb;
  bool birth = data.g > 0.5;
  bool death = data.b > 0.5;
  bool alive = data.r > 0.5;

  if (birth) {
    gl_FragColor = BIRTH;
  } else
  if (death) {
    gl_FragColor = DEATH;
  } else
  if (alive) {
    gl_FragColor = ALIVE;
  } else {
    gl_FragColor = DEAD;
  }
}

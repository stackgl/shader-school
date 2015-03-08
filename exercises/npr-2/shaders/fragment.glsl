precision mediump float;

uniform vec3 warm;
uniform vec3 cool;
uniform vec3 lightDirection;

varying vec3 fragNormal;

uniform float numBands;

void main() {
  float weight = 0.5 * (1.0 + dot(normalize(fragNormal), normalize(lightDirection)));
  vec3 lightColor = mix(cool, warm, weight);
  gl_FragColor = vec4(lightColor, 1);
}
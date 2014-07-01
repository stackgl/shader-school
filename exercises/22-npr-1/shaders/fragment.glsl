precision mediump float;

uniform vec3 diffuse, lightDirection;
varying vec3 fragNormal;

uniform float numBands;

void main() {
  float lambertWeight = max(dot(normalize(fragNormal), normalize(lightDirection)), 0.0);
  lambertWeight = ceil(lambertWeight * numBands) / numBands;
  vec3 lightColor = diffuse * lambertWeight;
  gl_FragColor = vec4(lightColor, 1);
}
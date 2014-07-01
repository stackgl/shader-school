precision mediump float;

uniform vec3 ambient, diffuse, lightDirection;
varying vec3 fragNormal;

void main() {
  vec3 lightColor = ambient + diffuse * max(dot(normalize(fragNormal), normalize(lightDirection)), 0.0);
  gl_FragColor = vec4(lightColor, 1);
}
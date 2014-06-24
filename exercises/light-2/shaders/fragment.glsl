precision mediump float;

uniform vec3 ambient, diffuse, lightDirection;
varying vec3 fragNormal;

void main() {
  vec3 lightColor = ambient + diffuse * dot(normalize(fragNormal), normalize(lightDirection));
  gl_FragColor = vec4(lightColor, 1);
}
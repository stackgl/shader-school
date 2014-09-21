precision highp float;
uniform vec3 ambient;

void main() {
  gl_FragColor = vec4(ambient, 1);
}
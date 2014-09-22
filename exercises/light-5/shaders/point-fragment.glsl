precision highp float;
uniform vec3 diffuse;
void main() {
  gl_FragColor = vec4(diffuse,1);
}
precision highp float;
varying float value;
void main() {
  vec3 color = vec3(sin(value), cos(value+0.7853981633974483), cos(value));
  gl_FragColor = vec4(normalize(color), 1.0);
}
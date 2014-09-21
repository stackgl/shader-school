precision mediump float;

void main() {
  float bx = mod(gl_FragCoord.x / 20.0, 2.0);
  float by = mod(gl_FragCoord.y / 20.0, 2.0);
  float brightness = (
    bx > 1.0 && by > 1.0 ||
    bx < 1.0 && by < 1.0
  ) ? 1.0 : 0.0;

  gl_FragColor = vec4(vec3(brightness, 0.2, 0.5), 1.0);
}

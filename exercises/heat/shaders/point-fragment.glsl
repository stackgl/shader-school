precision highp float;

uniform vec4 color;

void main() {
  float r = length(gl_PointCoord - vec2(0.5, 0.5));
  if(r > 0.5) {
    discard;
  }
  gl_FragColor = color;
}
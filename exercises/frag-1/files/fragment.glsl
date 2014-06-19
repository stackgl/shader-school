precision highp float;

uniform sampler2D texture;
uniform vec2 screenSize;
uniform vec2 center;
uniform float theta;

void main() {
  vec2 coord = gl_FragCoord.xy / screenSize;

  //TODO: Transform coord by rotating about center

  gl_FragColor = texture2D(texture, coord);
}

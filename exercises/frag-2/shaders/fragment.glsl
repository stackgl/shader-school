precision highp float;

uniform sampler2D texture;
uniform vec2 screenSize;
uniform vec2 center;
uniform float theta;

void main() {
  vec2 coord = gl_FragCoord.xy / screenSize;
  
  float s = sin(theta),
        c = cos(theta);

  mat2 m = mat2(c, s, -s, c);

  gl_FragColor = texture2D(texture, m*(coord-center) + center);
}

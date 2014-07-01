precision mediump float;

uniform vec2 screenSize, boxLo, boxHi;

bool inBox(highp vec2 lo, highp vec2 hi, highp vec2 x) {
  return all(lessThanEqual(lo, x)) && all(lessThanEqual(x, hi));
}

void main() {
  vec2 q = (gl_FragCoord.xy / screenSize);
  if(inBox(boxLo, boxHi, q)) {
    gl_FragColor = vec4(1,1,1,1);
  } else {
    gl_FragColor = vec4(0,0,0,1);
  }
}
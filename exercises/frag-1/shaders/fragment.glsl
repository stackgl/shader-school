precision highp float;

#define CIRCLE_COLOR    vec4(1, 0, 0, 1)
#define OUTSIDE_COLOR   vec4(0, 0, 1, 1)

void main() {
  float d2 = distance(gl_FragCoord.xy, vec2(256, 256));
  if(d2 >= 128.0) {
    gl_FragData[0] = CIRCLE_COLOR;
  } else {
    gl_FragData[0] = OUTSIDE_COLOR;
  }
}
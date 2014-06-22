precision highp float;

#define CIRCLE_COLOR    vec4(1, 0, 0, 1)
#define OUTSIDE_COLOR   vec4(0, 0, 1, 1)

void main() {

  //TODO: Replace this with a function that draws a circle at (256.5,256.5) with radius 128
  
  if(gl_FragCoord.y > 256.0) {
    gl_FragColor = CIRCLE_COLOR;
  } else {
    gl_FragColor = OUTSIDE_COLOR;
  }
}
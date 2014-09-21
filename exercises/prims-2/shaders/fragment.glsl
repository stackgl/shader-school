precision highp float;

uniform vec3 frontColor, backColor;

void main() {
  if(gl_FrontFacing) {
    gl_FragColor = vec4(frontColor, 1.0);
  } else {
    gl_FragColor = vec4(backColor, 1.0);
  }
}
precision mediump float;

uniform sampler2D state[2];       //State buffer
uniform vec2 screenSize;          //Size of screen buffer
uniform vec2 mousePosition;       //Position of mouse
uniform bvec3 mouseDown;        //Test if mouse left, right, middle is down
uniform float time;               //Time since start

void main() {
  vec3 paintColor = vec3(0,0,0);

  //Paint colors depending on mouse state
  float w = exp2(-0.05 * distance(gl_FragCoord.xy, mousePosition));
  if(mouseDown.x) {
    paintColor.r = w;
  }
  if(mouseDown.y) {
    paintColor.g = w;
  }
  if(mouseDown.z) {
    paintColor.b = w;
  }

  //Write out texture 
  vec2 texCoord = gl_FragCoord.xy / screenSize;
  gl_FragColor = texture2D(state[0], texCoord) + vec4(paintColor, 0.0);
}

precision mediump float;

uniform sampler2D state[3];        //State buffer
uniform vec2 screenSize;          //Size of screen buffer
uniform vec2 mousePosition;       //Position of mouse
uniform bool mouseDown[3];        //Test if mouse left, right, middle is down
uniform float time;               //Time since start

void main() {
  gl_FragColor = vec4(texture2D(state[0], gl_FragCoord.xy / screenSize).rgb, 1.0);
}
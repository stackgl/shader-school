precision mediump float;

uniform sampler2D uTexture;
uniform vec2 uMouse;
varying vec2 vUv;

// Each frame, draw a white circle around the mouse that
// has a radius of 20 pixels. Everywhere else, fade to black
// as slowly as possible.
vec3 update(vec3 color) {
  vec2 pixelPosition = gl_FragCoord.xy;
  vec2 mousePosition = uMouse;
  float dist = distance(mousePosition, pixelPosition);

  if (dist <= 20.0) {
    color = vec3(1.0);
  } else {
    color.rgb -= 1.0/255.0;
  }

  return color;
}

void main() {
  vec3 original = texture2D(uTexture, vUv).rgb;

  gl_FragColor.rgb = update(original);
  gl_FragColor.a = 1.0;
}

precision mediump float;

varying vec2 fragIndex;
uniform sampler2D positions;
uniform sampler2D speeds;

void main() {
  vec2 position = texture2D(positions, fragIndex).xy;
  vec2 speed    = texture2D(speeds, fragIndex).xy;

  float x = gl_PointCoord.x - 0.5;
  float y = gl_PointCoord.y - 0.5;
  if (x*x+y*y>0.25) discard;

  vec3 color = mix(
      vec3(1.0, 0.8862, 0.3725)
    , vec3(1.0, 0.4313, 0.3411)
    , fragIndex.x
  );

  gl_FragColor = vec4(color * vec3(0.5), 1.0);
}

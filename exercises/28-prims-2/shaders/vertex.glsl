precision highp float;

attribute vec2 position;
uniform mat4 model, view, projection;
uniform float theta;

void main() {
  vec2 c = 4.0 * (position / 128.0 - vec2(0.25, 0.0));
  float f = 0.25 * (cos(c.x + theta) + sin(4.0 * c.x * c.y + 0.5*theta) - 2.0 * sin(2.0 * c.y - 2.0*theta));
  gl_Position = projection * view * model * vec4(c.x, f, c.y, 1.0);
}

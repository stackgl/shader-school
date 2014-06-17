attribute vec2 uv;

uniform mat4 view;
uniform mat4 projection;

varying float value;

float expectedFunc(float x, float y) {
  return x + y;
}

void main() {
  vec2 coord = (uv / 128.0) - 1.0;
  float f = expectedFunc(coord.x, coord.y);
  gl_Position = projection * view * vec4(coord.x, f, coord.y, 1.0);
  value = f;
}
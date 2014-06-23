precision highp float;
attribute vec3 position;

uniform mat4 view, projection;
uniform vec3 shiftVec;

#pragma glslify: translation=require(./expected.glsl)

void main() {
  gl_Position = projection * view * translation(shiftVec) * vec4(position, 1);
}
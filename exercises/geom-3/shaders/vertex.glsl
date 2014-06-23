precision highp float;
attribute vec3 position;

uniform mat4 view, projection;
uniform vec3 scaleVec;

#pragma glslify: transform=require(./expected.glsl)

void main() {
  gl_Position = projection * view * transform(scaleVec) * vec4(position, 1);
}
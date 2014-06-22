precision mediump float;
attribute vec4 vertexData;
uniform vec2 aVector;
uniform vec2 bVector;

#pragma glslify: func=require(./expected.glsl)

void main() {
  vec2 base = vertexData.x * aVector +
              vertexData.y * bVector +
              vertexData.z * func(aVector, bVector);
  float baseLen = length(base);
  float offsetScale = vertexData.w;
  vec2 headShift = offsetScale * normalize(vec2(-base.y, base.x)) - abs(offsetScale) * normalize(base);
  gl_Position = vec4(base + headShift, 0.0, 1.0);
}

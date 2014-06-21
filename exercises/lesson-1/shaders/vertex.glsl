precision mediump float;
attribute vec4 vertexData;
uniform vec2 aVector;
uniform vec2 bVector;

vec2 func(vec2 a, vec2 b) {
  return normalize(normalize(a) + normalize(b));
}

void main() {
  vec2 base = vertexData.x * aVector +
              vertexData.y * bVector +
              vertexData.z * func(aVector, bVector);
  float baseLen = length(base);
  float offsetScale = vertexData.w;
  vec2 headShift = offsetScale * normalize(vec2(-base.y, base.x)) - abs(offsetScale) * normalize(base);
  gl_Position = vec4(base + headShift, 0.0, 1.0);
}

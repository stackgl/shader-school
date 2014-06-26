precision mediump float;
attribute vec4 vertexData;

uniform highp float angle;

#pragma glslify: sides=require(./expected.glsl)

void main() {

  float op, adj;
  sides(1.5, angle, op, adj);
  
  vec2 aVector = vec2(0, op);
  vec2 bVector = vec2(adj, 0);
  vec2 direction = vertexData.x * aVector + vertexData.y * bVector;
  vec2 shift = vertexData.w * normalize(vec2(-direction.y, direction.x)) - vertexData.z * normalize(direction);

  if(vertexData.w + vertexData.z > 0.5) {
    shift *= length(direction);
  } else {
    shift.x = -min(0.8*abs(adj), abs(shift.x));
    shift.y = -min(0.8*abs(op), abs(shift.y));
  }

  gl_Position = vec4(vec2(-0.5, -0.5) - shift, 0.0, 1.0);
}

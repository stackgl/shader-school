precision mediump float;

uniform sampler2D positions;
uniform sampler2D speeds;

#define CENTER_ATTRACTION 0.000005
#define SPEED_LIMIT 0.00225
#define SEPARATION 0.0000125
#define ALIGNMENT 0.000001
#define COHESION 0.00002
#define SIZE 64.0

vec2 separation(vec2 position, vec2 maxDistance, vec2 index) {
  vec2 influence = vec2(0.0);

  for (float x = 0.0; x < 1.0; x += 1.0 / SIZE)
  for (float y = 0.0; y < 1.0; y += 1.0 / SIZE) {
    vec2 uv  = vec2(x, y);
    vec2 pos = texture2D(positions, uv).xy;

    float self  = (
      x == index.x &&
      y == index.y
    ) ? 0.0 : 1.0;

    float close = all(
      greaterThanEqual(abs(position - pos), maxDistance)
    ) ? 1.0 : 0.0;

    influence -= self * close * (position - pos);
  }

  return position - influence;
}

vec2 alignment(vec2 speed) {
  vec2 influence = vec2(0.0);

  for (float x = 0.0; x < 1.0; x += 1.0 / SIZE)
  for (float y = 0.0; y < 1.0; y += 1.0 / SIZE) {
    vec2 uv  = vec2(x, y);
    vec2 spd = texture2D(speeds, uv).xy;

    influence += spd;
  }

  return influence;
}
vec2 cohesion(vec2 position) {
  vec2 influence = vec2(0.0);

  for (float x = 0.0; x < 1.0; x += 1.0 / SIZE)
  for (float y = 0.0; y < 1.0; y += 1.0 / SIZE) {
    vec2 uv  = vec2(x, y);
    vec2 pos = texture2D(positions, uv).xy;

    influence += pos / SIZE / SIZE;
  }

  return influence - position;
}

void main() {
  vec2 currentIndex = gl_FragCoord.xy / vec2(SIZE);
  vec2 position = texture2D(positions, currentIndex).xy;
  vec2 speed    = texture2D(speeds, currentIndex).xy;

  speed += normalize(alignment(speed)) * ALIGNMENT;
  speed += normalize(cohesion(position)) * COHESION;
  speed += normalize(separation(position, vec2(0.01), currentIndex)) * SEPARATION;

  speed += normalize(vec2(0.5) - position) * CENTER_ATTRACTION;

  gl_FragColor.xy = clamp(speed, -SPEED_LIMIT, SPEED_LIMIT);
  gl_FragColor.zw = vec2(1.0);
}

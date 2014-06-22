vec2 func(vec2 a, vec2 b) {
  return normalize(normalize(a) + normalize(b));
}

#pragma glslify: export(func)
highp mat4 translate(vec3 p) {
  return mat4(1, 0, 0, 0,
              0, 1, 0, 0, 
              0, 0, 1, 0,
              -p.x, -p.y, -p.z, 1);
}

#pragma glslify: export(translate)
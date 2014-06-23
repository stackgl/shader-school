highp mat4 reflection(highp vec3 n) {
  n = normalize(n);
  return mat4(1.0-2.0*n.x*n.x,    -2.0*n.y*n.x,    -2.0*n.z*n.x, 0,
                 -2.0*n.y*n.x, 1.0-2.0*n.y*n.y,    -2.0*n.z*n.y, 0, 
                 -2.0*n.z*n.x,    -2.0*n.y*n.z, 1.0-2.0*n.z*n.z, 0,
                            0,               0,               0, 1);
}

#pragma glslify: export(reflection)
highp mat4 reflection(highp vec3 n) {

  //TODO: Return a matrix that reflects all points about the plane passing through the origin with normal n

  return mat4(1, 0, 0, 0,
              0, 1, 0, 0, 
              0, 0, 1, 0,
              0, 0, 0, 1);
}

#pragma glslify: export(reflection)
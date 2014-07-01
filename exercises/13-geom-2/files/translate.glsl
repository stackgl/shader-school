highp mat4 translate(highp vec3 p) {

  //TODO: Construct a matrix, m, which translates all points so that p is at the origin.

  return mat4(1, 0, 0, 0,
              0, 1, 0, 0, 
              0, 0, 1, 0,
              0, 0, 0, 1);
}

//Do not remove this line
#pragma glslify: export(translate)
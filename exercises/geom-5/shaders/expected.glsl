highp mat4 rotation(highp vec3 n, highp float theta) {

  float s = sin(theta);
  float c = cos(theta);
  float oc = 1.0 - c;

  return mat4(
    oc * n.x * n.x + c,       oc * n.x * n.y + n.z * s,   oc * n.z * n.x - n.y * s,   0.0,
    oc * n.x * n.y - n.z * s, oc * n.y * n.y + c,         oc * n.y * n.z + n.x * s,   0.0,
    oc * n.z * n.x + n.y * s, oc * n.y * n.z - n.x * s,   oc * n.z * n.z + c,         0.0,
    0.0,                      0.0,                        0.0,                        1.0
  );
}

#pragma glslify: export(rotation)

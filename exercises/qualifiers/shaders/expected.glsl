void sideLengths(
  float hypotenuse, 
  float angleInDegrees, 
  out float opposite, 
  out float adjacent) {

  float theta = radians(angleInDegrees);
  opposite = hypotenuse * sin(theta);
  adjacent = hypotenuse * cos(theta);
}

//Do not change this line
#pragma glslify: export(sideLengths)
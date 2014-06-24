uniform mat4 model, view, projection;
uniform vec3 lightPosition;
void main() {
  gl_Position = projection * view * model * vec4(lightPosition, 1);
  gl_PointSize = 10.0;
}

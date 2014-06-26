attribute vec2 uv;
void main() {
  gl_Position = vec4(uv,0,1);
}
precision mediump float;

uniform vec3 ambient, specular, lightPosition;
uniform float shininess;
varying vec3 fragNormal, fragPosition, lightDirection;

void main() {
  vec3 diffuse = vec3(1.0);
  vec3 eyeDirection = normalize(fragPosition);
  vec3 normal = normalize(fragNormal);
  vec3 light = normalize(lightDirection);

  float lambert = dot(normal, light);
  float phong = pow(max(dot(reflect(light, normal), eyeDirection), 0.0), shininess);

  vec3 lightColor = ambient + diffuse * lambert + specular * phong;
  vec3 boost = vec3(0.1, 0.3, 0.4) * dot(fragNormal, vec3(0.0, -1.0, 0.0));
  gl_FragColor = vec4(lightColor + boost, 1);
}

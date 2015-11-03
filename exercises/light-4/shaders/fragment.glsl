precision mediump float;

uniform vec3 ambient;
uniform vec3 diffuse;
uniform vec3 specular;
uniform vec3 lightPosition;

uniform float shininess;

varying vec3 fragNormal;
varying vec3 fragPosition;
varying vec3 lightDirection;

void main() {
  vec3 eyeDirection = normalize(fragPosition);
  vec3 normal = normalize(fragNormal);
  vec3 light = normalize(lightDirection);
  
  float lambert = max(dot(normal, light), 0.0);
  float phong = pow(max(dot(reflect(light, normal), eyeDirection), 0.0), shininess);

  vec3 lightColor = ambient + diffuse * lambert + specular * phong;
  gl_FragColor = vec4(lightColor, 1);
}
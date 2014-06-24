precision mediump float;

uniform vec3 ambient, diffuse, specular, lightPosition, eyeDirection;
uniform float shininess;

varying vec3 fragNormal, fragPosition;

void main() {
  vec3 normal = normalize(fragNormal);
  vec3 light = normalize(lightPosition - fragPosition);
  
  float lambert = dot(normal, light);
  float phong = pow(max(dot(reflect(light, normal), eyeDirection), 0.0), shininess);

  vec3 lightColor = ambient + diffuse * lambert + specular * phong;
  gl_FragColor = vec4(lightColor, 1);
}
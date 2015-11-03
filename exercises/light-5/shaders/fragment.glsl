precision mediump float;

#pragma glslify: PointLight = require(./light.glsl)

uniform vec3 ambient;
uniform PointLight lights[4];

varying vec3 fragNormal;
varying vec3 fragPosition;
varying vec3 lightDirection[4];

void main() {
  vec3 eyeDirection = normalize(fragPosition);
  vec3 normal = normalize(fragNormal);
  vec3 lightColor = ambient;

  for(int i=0; i<4; ++i) {
    vec3 light = normalize(lightDirection[i]);
    float lambert = max(dot(normal, light), 0.0);
    float phong = pow(max(dot(reflect(light, normal), eyeDirection), 0.0), lights[i].shininess);
    lightColor += lambert * lights[i].diffuse + phong * lights[i].specular;
  }
  
  gl_FragColor = vec4(lightColor, 1);
}
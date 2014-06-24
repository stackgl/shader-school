# Phong lighting

The Phong lighting model is probably the most widely used lighting model in computer graphics. It models shiny, or specular materials, like metals, plastic and so on. Physically, what these materials scatter light by hard reflections instead of smoothly diffusing outward. The Phong lighting model approximates this process by adding in an extra term to account for these reflections.

The general idea is that we first reflect the incoming light direction about the surface normal, then we project this vector onto the view axis and measure its length. The amount of reflected specular light is then assumed to be proportional to some power of this length.

Explicitly, the parameters in this model are:

* The light direction
* The surface normal
* The view or "eye" direction
* The "shininess" exponent

In GLSL, we can write out the Phong lighting weight compactly using the built in functions:

```glsl
float phongWeight(vec3 lightDirection, vec3 surfaceNormal, vec3 eyeDirection, float shininess) {
  //First reflect light by surface normal
  vec3 rlight = reflect(lightDirection, surfaceNormal);

  //Next find the projected length of the reflected light vector in the view direction
  float eyeLight = max(dot(rlight, eyeDirection), 0.0);

  //Finally exponentiate by the shininess factor
  return pow(eyeLight, shininess);
}
```

The Phong lighting model is then usually combined with diffuse and ambient terms to give a complete lighting model:

```glsl
light = ambient + diffuse * lambert + specular * phong
```

## Exercise

Implement the Phong lighting model in GLSL.  <TODO document and double check all of this>
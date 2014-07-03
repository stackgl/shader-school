# Phong lighting

## Exercise

Implement the Phong lighting model in GLSL.  To get started, a vertex and fragment shader have been created in <a href="/open/19-light-3" target="_blank">the directory for this lesson</a>.  The input to these shaders will be as follows:

### Attributes

* `position` the position of each vertex
* `normal` the normal vector the mesh at each vertex

### Uniforms

* `model, view, projection` The forward model, view and projection matrices
* `inverseModel, inverseView, inverseProjection` The inverse of the above transformation matrices
* `ambient` the color and intensity of the ambient light parameter
* `diffuse` the color and intensity of the diffuse light
* `specular` the color and intensity of the specular light
* `lightDirection` the direction of the incoming light
* `shininess` the exponent in the Phong specular parameter

### Hint

To compute the eye direction, use the fact that this is the same as the normalized view position. (You should prove to yourself that this is the case.)

For finding the half angle between the eye and light direction, remember the exercise from `INTRO 2`.

***

## Phong Lighting

The Phong lighting model is probably the most widely used lighting model in computer graphics. It models shiny, or specular, materials like metals, plastic and so on. Physically, what these materials scatter light by hard reflections instead of smoothly diffusing outward. The Phong lighting model approximates this process by adding in an extra term to account for these reflections.

The general idea is that we first reflect the incoming light direction about the surface normal, then we project this vector onto the view axis and measure its length. The amount of reflected specular light is then assumed to be proportional to some power of this length.

Explicitly, the parameters in this model are:

* The light direction
* The surface normal
* The view or "eye" direction
* The "shininess" exponent

In GLSL, we can write out the Phong lighting weight compactly using the built in functions:

```glsl
float phongWeight(
  vec3 lightDirection,
  vec3 surfaceNormal,
  vec3 eyeDirection,
  float shininess
) {
  //First reflect light by surface normal
  vec3 rlight = reflect(lightDirection, surfaceNormal);

  //Next find the projected length of the reflected
  //light vector in the view direction
  float eyeLight = max(dot(rlight, eyeDirection), 0.0);

  //Finally exponentiate by the shininess factor
  return pow(eyeLight, shininess);
}
```

The Phong lighting model is then usually combined with diffuse and ambient terms to give a complete lighting model:

```glsl
light = (
    ambient
  + diffuse * lambert
  + specular * phong
)
```

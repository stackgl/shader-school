# Gooch shading

## Exercise

In this exercise, you will implement the two color version of Gooch shading. To get you started, <a href="/open/23-npr-2" target="_blank">a template vertex and fragment shader has been created in the directory for this project</a>.  These shaders will be passed the following parameters:

### Attributes

* `position` vertex position
* `normal` vertex normal

### Uniforms

* `model, view, projection` standard coordinate transformations
* `warm, cool` the two colors which the Gooch shading model interpolates
* `lightDirection` the direction of incident light in the scene

***

Another simple and effective non-photorealistic rendering technique is Gooch shading.  Gooch shading is useful for technical illustrations, or otherwise coloring objects in such a way to make fine details and contours pop out.  The basic idea in Gooch shading is to modify Lambertian diffuse lighting in two ways:

1.  First, instead of clamping negative weights to 0, the weights are allowed to range from [-1,1].
2.  Second, instead of interpolating from the diffuse light value to 0, the light color is smoothly interpolated over some other color space.

Concretely, the weight for the light color in Gooch shading is defined to be:

```glsl
float goochWeight(vec3 normal, vec3 lightDirection) {
  return 0.5 * (1.0 + dot(normal, lightDirection));
}
```

And in two color Gooch shading, the color is given by interpolating between any pair of colors given this weight:

```glsl
vec3 goochColor(vec3 cool, vec3 warm, float weight) {
  return (1.0 - weight) * cool + weight * warm;
}
```

It is also possible to interpolate over more colors or to use textures for assigning the colors instead.

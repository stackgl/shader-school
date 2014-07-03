# Diffuse lighting

## Exercise

Implement a shader which renders a 3D object using Lambertian diffuse lighting. The inputs to the shader will be as follows:

#### Attributes

* `position` which is the position of vertex in data coordinates
* `normal` which is the surface normal sampled at each vertex in data coordinates

#### Uniforms

* `mat4 model, view, projection` the transformations for moving the object from data coordinates to clip coordinates
* `mat4 inverseModel, inverseView, inverseProjection` the matrix inverses of each of the above transformations
* `vec3 ambient` the ambinet light coefficient
* `vec3 diffuse` the diffuse light coefficient
* `vec3 lightDirection` the direction of the point light source (normalized)

#### Notes

To implement your shader, modify the `vertex.glsl` and `fragment.glsl` files <a href="/open/18-light-2" target="_blank">in this lessons's directory</a>.

***

## Lambertian diffuse lighting

The Lambertian diffuse lighting model is a simple physically based model for matte surfaces. The general idea is that we assume that the surface will absorb some portion of the incoming radiation, and scatter the rest uniformly. This is a reasonable assumption for materials like paper, paint and so on. It is also a basic component in developing more sophisticated lighting models, which often include a diffuse term as a component.

For now, we will assume that the light source is sufficiently far away that all incoming light is travelling in the same direction, `d`. Then Lambert's cosine law says that the amount of diffuse light emitted from a point the surface with a normal vector `n` is proportional to the following weight:

```glsl
float lambertWeight(vec3 n, vec3 d) {
  return max(dot(n, d), 0.0);
}
```

Combined with an ambient term (as was used before in the flat shading model), this gives the following expression for the light reflected at a point on the surface:

```glsl
vec3 reflectedLight(
  vec3 normal,
  vec3 lightDirection,
  vec3 ambient,
  vec3 diffuse
) {
  float brightness = dot(normal, lightDirection);
  return ambient + diffuse * max(brightness, 0.0);
}
```

## Transforming normals

One slightly tricky thing about this formula is that makes use of normal vectors.  Normal vectors, unlike points, are what are called dual vectors.  That is they encode planes parallel to the surface, not directions.  The parallel distance along a normal vector is given by the dot product with the normal vector. Or more precisely, given a test point p, the distance along the normal direction at a point on the surface is given by the following function:

```glsl
float parallelDistance(
  vec3 surfacePoint,
  vec3 surfaceNormal,
  vec3 p
) {
  return dot(p - surfacePoint, surfaceNormal);
}
```

But consider what happens if we transform the surface into world coordinates using a model transformation, `model`.  Then this should be equivalent to moving the input test point by the *inverse* of `model`.  This means that in order for the above function to remain invariant, *the surface normal must transform by the inverse transpose of `model`*.  This is a subtle, but very important distinction, and it is an easy mistake to make when first learning about computer graphics.

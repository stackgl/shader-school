# Scaling

Scaling transformations stretch or squish the coordinate axes. Specifically, scaling a vector `v` by a factor of `s` along each axis can be defined using the following function:

```glsl
vec3 scaleVector(vec3 v, vec3 s) {
  return s * v;
}
```

## Exercises

Scaling transformations are also linear in projective geometry. For this exercise, translate the above scaling function into a 4x4 matrix.